const express = require("express");
const Provider = require("../models/Provider");

const router = express.Router();

// add a provider

router.post("/", async (req, res) => {
    const { name, country, marketShare, renewablePercentage, yearlyRevenue } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }

    const newProvider = new Provider({
        name,
        country,
        marketShare,
        renewablePercentage,
        yearlyRevenue
    });

    try {
        const savedProvider = await newProvider.save();
        res.status(201).json(savedProvider)
    } catch (err) {
        res.status(400).json({ error: "Invalid data" });
    }
});

// delete a provider

router.delete("/:id", async (req, res) => {
    try {
        await Provider.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get all providers

router.get("/", async (req, res) => {
    try {
        const providers = await Provider.find();
        res.json(providers);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// edit provider

router.put("/:id", async (req,res) => {
    try {
        const updatedProvider = await Provider.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedProvider) {
            return res.status(404).json({ message: "Provider not found" });
        }
        res.json(updatedProvider);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
