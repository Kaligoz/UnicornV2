const { z } = require("zod");

const providerValidationSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    country: z.string().min(3, "Country must be at least 4 characters"),
    marketShare: z.number()
        .max(100, "Market share can not be higher then 100")
        .positive("Market share can not be negative"),
    renewablePercentage: z.number()
        .max(100, "Renewable energy perventage can not be higher then 100")
        .positive("Renewable energy perventage can not be negative"), 
    yearlyRevenue: z.number().positive("Yearly revenue must be positive") ,
});

const validateProvider = (req, res, next) => {
    const validation = providerValidationSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({ errors: validation.error.format() });
    }

    next();
};

module.exports = { providerValidationSchema, validateProvider };