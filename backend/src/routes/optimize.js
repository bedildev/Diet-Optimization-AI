const express = require("express");

const { validate } = require("../middleware/validate");
const { optimizeSchema } = require("../validators/optimize");

const router = express.Router();

router.post("/optimize", validate(optimizeSchema), (req, res) => {
  const { budget_maksimal, target_kalori } = req.body;

  res.json({
    status: "success",
    message: "Ini adalah data dummy.",
    data: {
      parameter_pencarian: {
        budget: budget_maksimal,
        kalori: target_kalori
      },
      rekomendasi_menu: [
        { nama: "Nasi Putih", porsi: "100g", harga: 1500, kalori: 130 },
        { nama: "Sayur Bayam Bening", porsi: "100g", harga: 2000, kalori: 36 },
        { nama: "Tempe Goreng", porsi: "50g", harga: 1500, kalori: 170 },
        { nama: "Telur Rebus", porsi: "1 butir", harga: 2500, kalori: 78 },
        { nama: "Pisang Ambon", porsi: "1 buah", harga: 2000, kalori: 89 }
      ],
      ringkasan: {
        total_harga: 9500,
        total_kalori: 503,
        total_protein: 21
      }
    }
  });
});

module.exports = router;
