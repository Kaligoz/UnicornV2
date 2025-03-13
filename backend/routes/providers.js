const express = require("express");
const Provider = require("../models/Provider");
const { validateProvider } = require('../validators/providerValidator');

const router = express.Router();

// add a provider

router.post("/", validateProvider, async (req, res) => {
    const { name, country, marketShare, renewablePercentage, yearlyRevenue } = req.body;

    const newProvider = new Provider({ name, country, marketShare, renewablePercentage, yearlyRevenue });
    try {
        const savedProvider = await newProvider.save();
        res.status(201).json(savedProvider)
    } catch (error) {
        next(error);
    }
});

// delete a provider

router.delete("/:id", async (req, res) => {
    try {
        await Provider.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

// get all providers
router.get("/", async (req, res) => {
    try {
        const providers = await Provider.find();
        res.json(providers);
    } catch (error) {
        next(error);
    }
});

// get provider by id 
router.get("/:id", async (req, res) => {
    try {
        const providers = await Provider.findById(req.params.id);
        if (!providers) {
            return res.status(404).json({ error: "Provider not found" });
        }
        res.json(providers);
    } catch (error) {
        next(error);
    }
});

// edit provider
router.put("/:id", validateProvider, async (req,res) => {
    try {
        const provider = await Provider.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!provider) {
            return res.status(404).json({ message: "Provider not found" });
        }
        res.json(provider);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
