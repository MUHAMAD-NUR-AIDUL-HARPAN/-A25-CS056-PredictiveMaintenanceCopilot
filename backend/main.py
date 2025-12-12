# file: backend/main.py
import os
from fastapi import FastAPI, Depends, HTTPException 
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import uvicorn
from groq import Groq
from sqlalchemy import create_engine, Column, Integer, Float, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from datetime import datetime

app = FastAPI()

# ==========================================
# 1. SETUP DATABASE (DIPERBAIKI)
# ==========================================
# Logika ini HARUS di atas sebelum 'create_engine' dipanggil!

DB_FOLDER = "/railway_data"
if os.path.exists(DB_FOLDER):
    print("📂 Menggunakan Database RAILWAY VOLUME (Persisten)")
    SQLALCHEMY_DATABASE_URL = f"sqlite:///{DB_FOLDER}/turbiq_data.db"
else:
    print("💻 Menggunakan Database LOKAL")
    SQLALCHEMY_DATABASE_URL = "sqlite:///./turbiq_data.db"

# Nyalakan mesin database berdasarkan URL di atas
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# --- TABEL SENSOR ---
class SensorLog(Base):
    __tablename__ = "sensor_logs"
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.now)
    air_temp = Column(Float)
    process_temp = Column(Float)
    rpm = Column(Float)
    torque = Column(Float)
    tool_wear = Column(Float)
    prediction = Column(String)
    risk_score = Column(Float)

# --- TABEL USER ---
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(String, default="engineer")

# Buat semua tabel di database
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- FUNGSI BUAT USER ADMIN OTOMATIS ---
def create_default_user():
    db = SessionLocal()
    # Cek apakah admin sudah ada
    user = db.query(User).filter(User.username == "admin").first()
    if not user:
        # Jika belum ada, buat user admin default
        admin_user = User(username="admin", password="admin123", role="admin")
        db.add(admin_user)
        db.commit()
        print("✅ User Default dibuat: admin / admin123")
    db.close()

# Jalankan fungsi pembuatan user saat server start
create_default_user()

# ==========================================
# 2. KONFIGURASI API Key GROQ AI (AMAN)
# ==========================================
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    print("⚠️  WARNING: GROQ_API_KEY belum disetting di Environment Variables!")

try:
    client = Groq(api_key=GROQ_API_KEY)
    CHAT_MODEL = "llama-3.1-8b-instant"
    print("✅ SUKSES: Terhubung ke Groq AI (Llama 3)")
except Exception as e:
    print(f"❌ ERROR: Gagal connect ke Groq. {e}")
    client = None

SYSTEM_INSTRUCTION = """
Kamu adalah 'TurbIQ Copilot', asisten AI ahli maintenance di sebuah pabrik.

INFORMASI PENTING (JANGAN MENGARANG):
1. Saat ini sistem HANYA memonitor 1 (Satu) Mesin saja, yaitu: "Hydraulic Press A1".
2. Jika user bertanya "ada berapa mesin", jawab tegas: "Saat ini hanya ada 1 unit mesin yang terhubung ke Dashboard TurbIQ."
3. Jangan menyebutkan mesin pengering, pengukus, atau mesin lain yang tidak ada.
4. Tugasmu fokus menganalisis kondisi teknis mesin (suhu, getaran, torsi).

Gunakan Bahasa Indonesia yang profesional, singkat, dan solutif.
"""

# ==========================================
# 3. SETUP SERVER
# ==========================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model_path = 'model/maintenance_model.pkl'
try:
    if os.path.exists(model_path):
        model = joblib.load(model_path)
    else:
        model = None
except:
    model = None

class SensorInput(BaseModel):
    air_temp: float
    process_temp: float
    rpm: float
    torque: float
    tool_wear: float

class LoginRequest(BaseModel):
    username: str
    password: str

class ChatInput(BaseModel):
    message: str

@app.get("/")
def read_root():
    return {"message": "Server TurbIQ Siap! 🚀"}


# ==========================================
# 4. API LOGIN
# ==========================================
@app.post("/login")
def login_user(login_data: LoginRequest, db: Session = Depends(get_db)):
    # Cari user berdasarkan username
    user = db.query(User).filter(User.username == login_data.username).first()
    
    # Cek password
    if not user or user.password != login_data.password:
        raise HTTPException(status_code=401, detail="Username atau Password Salah!")
    
    return {
        "status": "success",
        "message": "Login Berhasil",
        "data": {
            "username": user.username,
            "role": user.role
        }
    }


# ==========================================
# 5. API PREDIKSI 
# ==========================================
@app.post("/predict")
def predict_failure(data: SensorInput, db: Session = Depends(get_db)):
    if not model:
        return {"status": "Offline", "risk_percentage": 0, "recommendation": "Model ML belum siap."}

    input_df = pd.DataFrame([[
        data.air_temp, data.process_temp, data.rpm, data.torque, data.tool_wear
    ]], columns=['Air temperature [K]', 'Process temperature [K]', 'Rotational speed [rpm]', 'Torque [Nm]', 'Tool wear [min]'])
    
    prediction = model.predict(input_df)[0]
    probability = model.predict_proba(input_df)[0][1]

    status = "Bahaya" if prediction == 1 else "Normal"
    rec = "PERINGATAN: Cek mesin segera!" if prediction == 1 else "Mesin beroperasi optimal."
    
    new_log = SensorLog(
        air_temp=data.air_temp,
        process_temp=data.process_temp,
        rpm=data.rpm,
        torque=data.torque,
        tool_wear=data.tool_wear,
        prediction=status,
        risk_score=round(probability * 100, 2)
    )
    db.add(new_log)
    db.commit()
    
    return {
        "status": status,
        "risk_percentage": round(probability * 100, 2),
        "recommendation": rec
    }

@app.get("/history")
def get_history(db: Session = Depends(get_db)):
    return db.query(SensorLog).order_by(SensorLog.id.desc()).limit(10).all()

# ==========================================
# 6. API CHATBOT
# ==========================================
@app.post("/chat")
def chat_copilot(chat: ChatInput):
    if not client:
        return {"reply": "Maaf, koneksi AI terputus (API Key Missing)."}
    
    try:
        response = client.chat.completions.create(
            messages=[
                {"role": "system", "content": SYSTEM_INSTRUCTION},
                {"role": "user", "content": chat.message}
            ],
            model=CHAT_MODEL,
            temperature=0.5, 
        )
        return {"reply": response.choices[0].message.content}
        
    except Exception as e:
        if "rusak" in chat.message.lower():
            return {"reply": "⚠️ Sistem mendeteksi potensi anomali. Silakan cek parameter getaran dan suhu pada dashboard."}
        return {"reply": f"Maaf, error: {str(e)}"}

# ==========================================
# 7. API DEBUG (OPSIONAL: UTK CEK ISI DB DI RAILWAY)
# ==========================================
@app.get("/debug/users")
def check_users(db: Session = Depends(get_db)):
    return db.query(User).all()

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)