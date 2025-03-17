const express = require("express");
const Provider = require("../models/Provider");
const { validateProvider } = require('../validators/providerValidator');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Providers
 *   description: API for managing electricity providers
 */

/**
 * @swagger
 * /providers:
 *   post:
 *     summary: Add a new electricity provider
 *     tags: [Providers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               country:
 *                 type: string
 *               marketShare:
 *                 type: number
 *               renewablePercentage:
 *                 type: number
 *               yearlyRevenue:
 *                 type: number
 *     responses:
 *       201:
 *         description: Provider added successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: "string"
 *               name: "string"
 *               country: "string"
 *               marketShare: 25
 *               renewablePercentage: 60
 *               yearlyRevenue: 2000000
 *               __v: 0
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Specific error message"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Internal Server Error"
 */
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

/**
 * @swagger
 * /providers/{id}:
 *   delete:
 *     summary: Delete a provider by ID
 *     tags: [Providers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the provider to delete
 *     responses:
 *       204:
 *         description: Provider deleted successfully (No Content)
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Specific error message"
 *       500:
 *         description: Internal Server Error
 */

router.delete("/:id", async (req, res) => {
    try {
        await Provider.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /providers:
 *   get:
 *     summary: Get all electricity providers
 *     tags: [Providers]
 *     responses:
 *       200:
 *         description: A list of all electricity providers
 *         content:
 *           application/json:
 *             example:
 *               - _id: "string"
 *                 name: "Green Energy"
 *                 country: "Germany"
 *                 marketShare: 20
 *                 renewablePercentage: 80
 *                 yearlyRevenue: 5000000
 *       500:
 *         description: Internal Server Error
 */

router.get("/", async (req, res) => {
    try {
        const providers = await Provider.find();
        res.json(providers);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /providers/{id}:
 *   get:
 *     summary: Get a provider by ID
 *     tags: [Providers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the provider to retrieve
 *     responses:
 *       200:
 *         description: Provider details
 *         content:
 *           application/json:
 *             example:
 *               _id: "string"
 *               name: "Green Energy"
 *               country: "Germany"
 *               marketShare: 20
 *               renewablePercentage: 80
 *               yearlyRevenue: 5000000
 *       404:
 *         description: Provider not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Provider not found"
 */

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

/**
 * @swagger
 * /providers/{id}:
 *   put:
 *     summary: Update provider information
 *     tags: [Providers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the provider to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               country:
 *                 type: string
 *               marketShare:
 *                 type: number
 *               renewablePercentage:
 *                 type: number
 *               yearlyRevenue:
 *                 type: number
 *     responses:
 *       200:
 *         description: Provider updated successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: "string"
 *               name: "Updated Energy"
 *               country: "France"
 *               marketShare: 30
 *               renewablePercentage: 90
 *               yearlyRevenue: 6000000
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Specific error message"
 *       404:
 *         description: Provider not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Provider not found"
 */

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