const express = require(express);
const app = express();

app.use(express.json());

app.post(price, (req, res) = {
    const { product, weight } = req.body;

    const perKgPrices = {
        Bali Special 260,
        Broiler 220,
        Cockerel 380,
        Gavran 760,
        Boneless 280,
        Kheema Chicken 280,
        Kaleji 200,
        Mutton 800,
        Vajri 300,
        Kheema Mutton 820
    };

    const fixedPrices = {
        Paya 180,
        Bheja 150,
        Mundi 600
    };

    if (fixedPrices[product]) {
        return res.json({ total_price fixedPrices[product] });
    }

    if (!weight) {
        return res.json({ error Weight required });
    }

    let quantity = 0;

    if (weight.includes(g)) {
        quantity = parseFloat(weight)  1000;
    } else if (weight.includes(kg)) {
        quantity = parseFloat(weight);
    }

    const pricePerKg = perKgPrices[product];

    if (!pricePerKg) {
        return res.json({ error Invalid product });
    }

    const total = quantity  pricePerKg;

    res.json({
        total_price Math.round(total)
    });
});

app.get(, (req, res) = {
    res.send(API Running);
});

app.listen(3000, () = console.log(Server running));