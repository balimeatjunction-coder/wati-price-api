const express = require("express");
const app = express();

app.use(express.json());

app.post("/price", (req, res) => {
    const { product, weight } = req.body;

    const prices = {
        "Broiler Chicken": 220,
        "Male Goat Mutton": 650
    };

    let quantity = 0;

    if (weight.includes("g")) {
        quantity = parseFloat(weight) / 1000;
    } else if (weight.includes("kg")) {
        quantity = parseFloat(weight);
    }

    const total = quantity * (prices[product] || 300);

    res.json({
        total_price: Math.round(total)
    });
});

app.get("/", (req, res) => {
    res.send("API is running");
});

app.listen(3000, () => console.log("Server running"));
