import os
from fastapi import FastAPI, Depends, HTTPException 
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse 
from pydantic import BaseModel
import joblib
import pandas as pd
import uvicorn
from groq import Groq
from sqlalchemy import create_engine, Column, Integer, Float, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from datetime import datetime
import math # Diperlukan untuk normalisasi

# Pastikan file simulation.py ada di folder yang sama
from simulation import generate_machine_data

app = FastAPI()

# ==========================================
# 1. SETUP DATABASE
# ==========================================
DB_FOLDER = "/railway_data"
if os.path.exists(DB_FOLDER):
    print("📂 Menggunakan Database RAILWAY VOLUME (Persisten)")
    SQLALCHEMY_DATABASE_URL = f"sqlite:///{DB_FOLDER}/turbiq_data.db"
else:
    print("💻 Menggunakan Database LOKAL")
    SQLALCHEMY_DATABASE_URL = "sqlite:///./turbiq_data.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# --- TABEL SENSOR ---
class SensorLog(Base):
    __tablename__ = "sensor_logs"
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.now)
    machine_id = Column(Integer)
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

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_default_user():
    db = SessionLocal()
    user = db.query(User).filter(User.username == "admin").first()
    if not user:
        admin_user = User(username="admin", password="admin123", role="admin")
        db.add(admin_user)
        db.commit()
        print("✅ User Default dibuat: admin / admin123")
    db.close()

create_default_user()

# ==========================================
# 2. KONFIGURASI AI
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

try:
    client = Groq(api_key=GROQ_API_KEY)
    CHAT_MODEL = "llama-3.1-8b-instant"
    print("✅ SUKSES: Terhubung ke Groq AI (Llama 3)")
except Exception as e:
    print(f"❌ ERROR: Gagal connect ke Groq. {e}")
    client = None

SYSTEM_INSTRUCTION = """
Kamu adalah 'TurbIQ Copilot', asisten AI ahli maintenance di sebuah pabrik modern.
... [Instruksi AI lainnya] ...
"""

# ==========================================
# 3. SETUP SERVER & MODEL
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

# --- DEFINISI MODEL PYDANTIC ---
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
    
class SensorData(BaseModel):
    air_temp: float
    process_temp: float
    rpm: float
    torque: float
    tool_wear: float

@app.get("/")
def read_root():
    return {"message": "Server TurbIQ Siap! 🚀"}


# ==========================================
# 4. API LOGIN
@app.post("/login")
def login_user(login_data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == login_data.username).first()
    if not user or user.password != login_data.password:
        raise HTTPException(status_code=401, detail="Username atau Password Salah!")
    return {"status": "success", "message": "Login Berhasil", "data": {"username": user.username, "role": user.role}}


# ==========================================
# 5. API PREDIKSI
@app.post("/predict")
def predict_failure(data: SensorInput, db: Session = Depends(get_db)):
    # ... [Logika prediksi manual] ...
    if not model:
        return {"status": "Offline", "risk_percentage": 0, "recommendation": "Model ML belum siap."}

    input_df = pd.DataFrame([[
        data.air_temp, data.process_temp, data.rpm, data.torque, data.tool_wear
    ]], columns=['Air temperature [K]', 'Process temperature [K]', 'Rotational speed [rpm]', 'Torque [Nm]', 'Tool wear [min]'])
    
    prediction = model.predict(input_df)[0]
    probability = model.predict_proba(input_df)[0][1]

    status = "Bahaya" if prediction == 1 else "Normal"
    rec = "PERINGATAN: Cek mesin segera!" if prediction == 1 else "Mesin beroperasi optimal."
    
    # Simpan ke DB
    new_log = SensorLog(
        machine_id=1,
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
def get_history_legacy(db: Session = Depends(get_db)):
    """Mengambil 10 log terakhir dari SEMUA mesin. Digunakan untuk kompatibilitas frontend."""
    logs = db.query(SensorLog).order_by(SensorLog.id.desc()).limit(10).all()
    return logs[::-1]


@app.get("/history/{machine_id}")
def get_history_by_machine(machine_id: int, db: Session = Depends(get_db)):
    logs = db.query(SensorLog)\
             .filter(SensorLog.machine_id == machine_id)\
             .order_by(SensorLog.id.desc())\
             .limit(20)\
             .all()
    return logs[::-1]


# ==========================================
# 6. API CHATBOT (Tidak diubah)
@app.post("/chat")
def chat_copilot(chat: ChatInput, db: Session = Depends(get_db)):
    if not client:
        return {"reply": "Maaf, koneksi AI terputus."}
    
    machine_ids = [1, 2, 3] 
    machine_names = {1: "Hydraulic Press A1", 2: "CNC Lathe B2", 3: "Robot Arm C3"}
    
    context_data = "📊 DATA REALTIME & DURASI MASALAH:\n"
    max_risk = 0
    UPDATE_INTERVAL_DETIK = 5 

    for mid in machine_ids:
        logs = db.query(SensorLog).filter(SensorLog.machine_id == mid).order_by(SensorLog.id.desc()).limit(12).all()
        
        if logs:
            current_log = logs[0] 
            
            consecutive_critical_count = 0
            for log in logs:
                if log.risk_score > 80:
                    consecutive_critical_count += 1
                else:
                    break 
            
            durasi_detik = consecutive_critical_count * UPDATE_INTERVAL_DETIK
            durasi_teks = f"{durasi_detik} detik"
            if durasi_detik >= 60:
                durasi_teks = f"{durasi_detik // 60} menit {durasi_detik % 60} detik"

            suhu = current_log.air_temp - 273.15
            risk = current_log.risk_score
            status = "AMAN"

            if risk > 80:
                status = "⛔ BAHAYA (KRITIS)"
                max_risk = max(max_risk, risk)
                status += f" [SUDAH BERLANGSUNG SELAMA: {durasi_teks}]"
            elif risk > 40:
                status = "⚠️ WASPADA"
                max_risk = max(max_risk, risk)
            
            context_data += (
                f"- {machine_names[mid]}:\n"
                f"  • Risiko: {risk}% | Suhu: {suhu:.1f}C\n"
                f"  • Status: {status}\n\n"
            )
        else:
            context_data += f"- {machine_names[mid]}: (Belum ada data)\n"

    tone_instruction = "🚨 KONDISI GAWAT!" if max_risk > 80 else "✅ KONDISI NORMAL."

    final_prompt = f"""
    {SYSTEM_INSTRUCTION}
    DATA SENSOR TERKINI:
    {context_data}
    INSTRUKSI:
    1. Jawab berdasarkan data di atas.
    2. Jika user tanya durasi/waktu, lihat bagian "SUDAH BERLANGSUNG SELAMA".
    3. {tone_instruction}
    """

    try:
        response = client.chat.completions.create(
            messages=[
                {"role": "system", "content": final_prompt},
                {"role": "user", "content": chat.message}
            ],
            model=CHAT_MODEL,
            temperature=0.2, 
        )
        return {"reply": response.choices[0].message.content}
    except Exception as e:
        print(f"Error Chat: {e}")
        return {"reply": "Maaf, gagal membaca data sensor."}


# ==========================================
# 7. API SIMULASI 
def normalize_data(data: SensorData):
    """Fungsi untuk Normalisasi data sesuai rentang dataset AI4I."""
    # Rentang nilai Min/Max dari dataset AI4I
    min_air, max_air = 295.3, 304.5
    min_proc, max_proc = 305.7, 313.8
    min_rpm, max_rpm = 1168, 2886
    min_torque, max_torque = 3.8, 76.6
    min_wear, max_wear = 0, 253

    def scale(value, min_val, max_val):
        return max(0.0, min(1.0, (value - min_val) / (max_val - min_val)))

    return {
        'Air temperature [K]': scale(data.air_temp, min_air, max_air),
        'Process temperature [K]': scale(data.process_temp, min_proc, max_proc),
        'Rotational speed [rpm]': scale(data.rpm, min_rpm, max_rpm),
        'Torque [Nm]': scale(data.torque, min_torque, max_torque),
        'Tool wear [min]': scale(data.tool_wear, min_wear, max_wear),
    }


@app.get("/sensor/simulate/{machine_id}")
def simulate_sensor_data(machine_id: int, db: Session = Depends(get_db)):
    
    last_log = db.query(SensorLog).filter(SensorLog.machine_id == machine_id).order_by(SensorLog.id.desc()).first()

    if last_log:
        time_diff = (datetime.now() - last_log.timestamp).total_seconds()
        
        if time_diff < 4:
            return {
                "status": "cached_from_db",
                "machine_id": machine_id,
                "data": {
                    "id": last_log.id,
                    "air_temp": last_log.air_temp,
                    "process_temp": last_log.process_temp,
                    "rpm": last_log.rpm,
                    "torque": last_log.torque,
                    "prediction": 1 if last_log.prediction == "Bahaya" or last_log.prediction == "1" else 0,
                    "risk_percentage": last_log.risk_score
                }
            }

    # 2. GENERATE DATA BARU
    raw_data = generate_machine_data(machine_id)
    
    input_data = SensorData(
        air_temp=raw_data["air_temp"],
        process_temp=raw_data["process_temp"],
        rpm=raw_data["rpm"],
        torque=raw_data["torque"],
        tool_wear=raw_data["tool_wear"]
    )

    if not model:
        prediction_val = 0
        risk_score = 0.0
        status_str = "Normal"
    else:
        normalized_dict = normalize_data(input_data)
        
        df_normalized = pd.DataFrame([normalized_dict])
        
        prediction_val = int(model.predict(df_normalized)[0])
        probabilities = model.predict_proba(df_normalized)[0]
        
        risk_score = round(probabilities[1] * 100, 2) if len(probabilities) > 1 else 0.0

        if risk_score > 80:
             status_str = "Bahaya"
        elif risk_score > 40:
             status_str = "Waspada"
        else:
             status_str = "Normal"
        
       
        if status_str == "Bahaya":
            prediction_val = 1
        elif status_str == "Waspada":
            prediction_val = 0 
        else:
            prediction_val = 0

    # Simpan Data Baru ke DB
    new_log = SensorLog(
        timestamp=datetime.now(),
        machine_id=machine_id,  
        air_temp=input_data.air_temp,
        process_temp=input_data.process_temp,
        rpm=input_data.rpm,
        torque=input_data.torque,
        tool_wear=input_data.tool_wear,
        prediction=status_str,
        risk_score=risk_score
    )
    db.add(new_log)
    db.commit()
    db.refresh(new_log)

    return {
        "status": "new_generated",
        "machine_id": machine_id,
        "data": {
            "id": new_log.id,
            "air_temp": new_log.air_temp,
            "process_temp": new_log.process_temp,
            "rpm": new_log.rpm,
            "torque": new_log.torque,
            "prediction": prediction_val,
            "risk_percentage": risk_score
        }
    }

# ==========================================
# 8. FITUR DOWNLOAD DB
@app.get("/download-db")
def download_database():
    railway_db = "/railway_data/turbiq_data.db"
    local_db = "./turbiq_data.db"
    if os.path.exists(railway_db):
        return FileResponse(railway_db, filename="turbiq_backup.db")
    elif os.path.exists(local_db):
        return FileResponse(local_db, filename="turbiq_backup.db")
    return {"error": "DB not found"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)