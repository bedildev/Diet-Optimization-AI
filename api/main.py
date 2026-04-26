from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(
    title="Optimasi Menu API",
    description="Dummy API untuk tim CC26-PSU091 sambil menunggu model TensorFlow selesai."
)

class OptimizationRequest(BaseModel):
    budget_maksimal: int
    target_kalori: int

# Endpoint dasar untuk mengecek apakah API menyala
@app.get("/")
def read_root():
    return {"message": "Server AI menyala! Silakan hit endpoint /optimize"}

# Endpoint utama untuk meminta rekomendasi menu
@app.post("/optimize")
def optimize_menu(request: OptimizationRequest):
    
    return {
        "status": "success",
        "pesan": "Ini adalah data dummy.",
        "parameter_pencarian": {
            "budget": request.budget_maksimal,
            "kalori": request.target_kalori
        },
        "rekomendasi_menu": [
            {"nama": "Nasi Putih", "porsi": "100g", "harga": 1500, "kalori": 130},
            {"nama": "Sayur Bayam Bening", "porsi": "100g", "harga": 2000, "kalori": 36},
            {"nama": "Tempe Goreng", "porsi": "50g", "harga": 1500, "kalori": 170},
            {"nama": "Telur Rebus", "porsi": "1 butir", "harga": 2500, "kalori": 78},
            {"nama": "Pisang Ambon", "porsi": "1 buah", "harga": 2000, "kalori": 89}
        ],
        "ringkasan": {
            "total_harga": 9500,
            "total_kalori": 503,
            "total_protein": 21
        }
    }