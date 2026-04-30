const express = require("express");
const app = express();

app.use(express.json());

// =========================
// PRODUCT PRICES (per kg)
// =========================
const prices = {
    // Chicken
    "Bali Special": 260,
    "Broiler": 220,
    "Cockerel": 380,
    "Gavran": 760,
    "Boneless": 280,
    "Chicken Kheema": 280,
    "Kaleji": 200,

    // Mutton
    "Mutton": 800,
    "Vajri": 300,
    "Mutton Kheema": 820,

    // Fixed items
    "Paya": 180,
    "Bheja": 150,
    "Mundi": 600
};

// =========================
// FIXED PRICE ITEMS
// =========================
const fixedItems = ["Paya", "Bheja", "Mundi"];

// =========================
// DELIVERY ZONES (YOUR FINAL)
// =========================
const deliveryZones = {
    // ₹20
    "Fashi Pool": 20,
    "Jilha Peth": 20,
    "Old Dhule": 20,
    "Datta Mandir Chowk": 20,

    // ₹40
    "Deopur": 40,
    "Panchavati": 40,
    "Jaihind Colony": 40,
    "Bhim Nagar": 40,
    "Wadibhokar": 40,

    // ₹60
    "Nakane Road": 60,
    "Railway Station": 60
};

// =========================
// API ROUTE
// =========================
app.post("/price", (req, res) => {
    const { product, weight, area } = req.body;

    console.log("Incoming:", product, weight, area);

    // Validate product
    if (!product) {
        return res.json({ total_price: null, error: "Product missing" });
    }

    const price = prices[product];

    if (!price) {
        return res.json({ total_price: null, error: "Invalid product" });
    }

    // =========================
    // FIXED ITEMS (NO WEIGHT)
    // =========================
    if (fixedItems.includes(product)) {
        const deliveryCharge = deliveryZones[area] || 0;

        return res.json({
            item_price: price,
            delivery_charge: deliveryCharge,
            total_price: price + deliveryCharge
        });
    }

    // =========================
    // WEIGHT VALIDATION
    // =========================
    if (!weight) {
        return res.json({ total_price: null, error: "Weight missing" });
    }

    let quantity = 0;

    // Normalize input
    const w = weight.toLowerCase().trim();

    if (w.includes("kg")) {
        quantity = parseFloat(w);
    } else if (w.includes("g")) {
        quantity = parseFloat(w) / 1000;
    } else {
        return res.json({ total_price: null, error: "Invalid weight format" });
    }

    // =========================
    // ITEM PRICE CALCULATION
    // =========================
    const itemTotal = quantity * price;

    // =========================
    // DELIVERY CALCULATION
    // =========================
    const deliveryCharge = deliveryZones[area] || 0;

    // =========================
    // FINAL TOTAL
    // =========================
    const finalTotal = Math.round(itemTotal + deliveryCharge);

    res.json({
        item_price: Math.round(itemTotal),
        delivery_charge: deliveryCharge,
        total_price: finalTotal
    });
});

// =========================
// HEALTH CHECK
// =========================
app.get("/", (req, res) => {
    res.send("API is running 🚀");
});

// =========================
// SERVER START
// =========================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
