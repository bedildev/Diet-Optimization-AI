import tensorflow as tf
import numpy as np
import joblib
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(
    title="Nutrition Optimization API",
    description="API Engine AI riil untuk tim PSU091"
)

# --- 1. MEMUAT MODEL & SCALER (Otak AI) ---
# Pastikan file .keras dan .pkl ada di folder yang sama dengan main.py
MODEL_PATH = "nutrition_optimizer_model.keras"
SCALER_PATH = "nutrition_scaler.pkl"

try:
    model = tf.keras.models.load_model(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
    print("✅ Model TensorFlow dan Scaler berhasil dimuat!")
except Exception as e:
    print(f"❌ Error: Gagal memuat model/scaler. Pastikan file ada di folder. Detail: {e}")
    model = None
    scaler = None

# --- 2. SKEMA DATA INPUT ---
class OptimizationRequest(BaseModel):
    budget_maksimal: int
    target_kalori: int

@app.get("/")
def read_root():
    return {"message": "Server AI Nutrition Optimization aktif!"}

# --- 3. ENDPOINT PREDIKSI RIIL ---
@app.post("/optimizes")
def optimize_menu(request: OptimizationRequest):
    if model is None or scaler is None:
        raise HTTPException(status_code=500, detail="Mesin AI belum siap di server.")
    
    try:
        # A. Siapkan data mentah (urutan: [harga_rp, kalori])
        input_raw = np.array([[request.budget_maksimal, request.target_kalori]], dtype=np.float32)
        
        # B. Normalisasi data menggunakan scaler asli saat training
        input_scaled = scaler.transform(input_raw)
        
        # C. Eksekusi Prediksi menggunakan model .keras
        prediction_scaled = model.predict(input_scaled)
        skor_prediksi = float(prediction_scaled[0][0])
        
        # D. Response JSON untuk diolah oleh Backend (Fery)
        return {
            "status": "success",
            "pesan": "Prediksi berhasil menggunakan model Nutrition Optimization.",
            "parameter_pencarian": {
                "budget": request.budget_maksimal,
                "kalori": request.target_kalori
            },
            "ringkasan": {
                "skor_nutrisi_prediksi": skor_prediksi,
                "catatan": "Skor mendekati 1 menunjukkan optimasi nutrisi yang sangat baik."
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gagal melakukan prediksi: {str(e)}")