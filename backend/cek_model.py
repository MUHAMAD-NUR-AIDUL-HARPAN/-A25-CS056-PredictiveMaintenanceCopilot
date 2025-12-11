import google.generativeai as genai

# Masukkan API Key Anda yang tadi
GOOGLE_API_KEY = "AIzaSyClwjg5WA7xk5jemil9bOTRos5PqUxxm-Y"
genai.configure(api_key=GOOGLE_API_KEY)

print("Mencari model yang tersedia...")
try:
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(f"- {m.name}")
except Exception as e:
    print(f"Error: {e}")