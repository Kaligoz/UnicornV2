const { z } = require("zod");

const userValidationSchema = z.object({
    username: z.string().min(1, "Username must be at least 1 characters"),
    password: z.string().min(3, "Password must be at least 3 characters"),
});

const validateUser = (req, res, next) => {
    const validation = userValidationSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({ error: validation.error.format() });
    }

    next();
};

module.exports = { userValidationSchema, validateUser }