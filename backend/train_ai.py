# file: backend/train_ai.py
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib
import os  # <--- Kita tambah ini untuk mengurus folder

# 1. BACA DATA
print("Membaca data...")

try:
    df = pd.read_csv('data/sensor_data.csv')
except FileNotFoundError:
    # Jaga-jaga jika nama filenya masih ai4i2020.csv
    df = pd.read_csv('data/ai4i2020.csv')

# 2. PILIH KOLOM PENTING
features = ['Air temperature [K]', 'Process temperature [K]', 
            'Rotational speed [rpm]', 'Torque [Nm]', 'Tool wear [min]']
target = 'Machine failure'

X = df[features]
y = df[target]

# 3. LATIH MODEL (AI BELAJAR)
print("Sedang melatih AI...")
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)

# 4. SIMPAN OTAKNYA
if not os.path.exists('model'):
    os.makedirs('model')

joblib.dump(model, 'model/maintenance_model.pkl')
print("Selesai! Model berhasil disimpan di folder 'model/maintenance_model.pkl'")