import express from "express";
import User from "../model/UserModel.js";
import Joi from "@hapi/joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const router = express.Router();

//Data controll
const registerSchema = Joi.object({
    firstName: Joi.string().required().min(3).max(255),
    email: Joi.string().required().email().min(3).max(255),
    password: Joi.string().required().min(6).max(255),
})

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required().min(6).max(255),
})

router.get("/users", async (req, res) => {
    try {
        const allUser = await User.find();
        res.json(allUser);
    } catch (error) {
        console.log(error)
    }

});

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    const { error } = loginSchema.validate(req.body)
    
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    User.findOne({ email })
        .then(user => {
            if (!user) {
                res.status(400).send("Invalid email or password");
                return;
            }

            const isValid = bcrypt.compareSync(password, user.password);
            if (!isValid) {
                res.status(400).send("Invalid email or password");
                return;
            }
            const token = jwt.sign({ _id: user._id }, "JWT_CODE")
            res.header("Authorization", token).json( token );

        })
        .catch((err) => {
            res
                .status(400)
                .send("Invalid email or password");
            return;
        })
})

router.post("/register", async (req, res) => {
    const { error } = registerSchema.validate(req.body)

    //Password security
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const user = await User.create({
        firstName: req.body.firstName,
        email: req.body.email,
        password: hash,
    });

    const token = jwt.sign({ _id: user._id }, "JWT_CODE")
    return res.status(200).send({ accsessToken: token });
});

export default router;