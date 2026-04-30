const express = require("express");
const app = express();

app.use(express.json());

// Product prices
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

    // Fixed price items
    "Paya": 180,
    "Bheja": 150,
    "Mundi": 600
};

// Fixed price products
const fixedItems = ["Paya", "Bheja", "Mundi"];

app.post("/price", (req, res) => {
    const { product, weight } = req.body;

    console.log("Incoming:", product, weight);

    if (!product) {
        return res.json({
            total_price: null,
            error: "Product missing"
        });
    }

    const price = prices[product];

    if (!price) {
        return res.json({
            total_price: null,
            error: "Invalid product"
        });
    }

    // Fixed price items
    if (fixedItems.includes(product)) {
        return res.json({
            total_price: price
        });
    }

    if (!weight) {
        return res.json({
            total_price: null,
            error: "Weight missing"
        });
    }

    let quantity = 0;

    if (weight.includes("g")) {
        quantity = parseFloat(weight) / 1000;
    } 
    else if (weight.includes("kg")) {
        quantity = parseFloat(weight);
    }

    const total = quantity * price;

    res.json({
        total_price: Math.round(total)
    });
});

app.get("/", (req, res) => {
    res.send("API is running");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
