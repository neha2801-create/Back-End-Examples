import { config } from "dotenv";
import dbconnect from "./config/database.js";
import express from "express";
import jwt from "jsonwebtoken";
import verifyToken from "./middleware/auth.js";
import User from "./model/user.js";
import { hash, verify } from 'argon2'
await dbconnect();
config();

const app = express();

app.use(express.json());

//Register User
app.post("/register", async (req, res) => {
    try {
        // Get user input from request
        const { username, password } = req.body;

        // Validate user input
        if (!(username && password)) {
            res.status(400).send("All input is required");
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ username });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        const hashedPassword = await hash(password);

        // Create user in our database
        const user = await User.create({
            username: username.toLowerCase(), // sanitize
            password: hashedPassword,
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, username },
            process.env.TOKEN,
            {
                expiresIn: "5h",
            }
        );
        // save user token
        user.token = token;
        user.save();

        // return new user
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
});

// Login
app.post("/login", async (req, res) => {

    try {
        // Get user input from request
        const { username, password } = req.body;

        // Validate user input
        if (!(username && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exists in our database
        const user = await User.findOne({ username: username.toLowerCase() }).exec();

        if (user && await verify(user.password, password)) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, username },
                process.env.TOKEN,
                {
                    expiresIn: "5h",
                }
            );

            // save user token
            user.token = token;

            // user
            return res.status(200).json(user);
        }
        return res.status(400).send("Invalid Credentials");
    }
    catch (err) {
        console.log(err);
    }
});

app.post("/", verifyToken, (req, res) => {
  res.status(200).send("Welcome to your home page!");
});

export default app;