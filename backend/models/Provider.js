const mongoose = require("mongoose");

const ProviderSchema = new mongoose.Schema({
    name: {type: String, required: true},
    country: {type: String, required: true},
    marketShare: {type: Number, required: true, min:[0], max:[100]},
    renewableEnergyPercent: {type: Number, required: true, min:[0], max:[100]},
    yearlyRevenue: {type: Number, required: true},
})

module.exports = mongoose.model("provider", ProviderSchema)