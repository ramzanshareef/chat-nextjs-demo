"use server";

import User from "@/models/User";
import connectDB from "../connectDB";
import { cookies } from "next/headers";


const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;



export async function userSignup(currentState, formData) {
    let name = formData.get("name");
    let email = formData.get("email");
    let password = formData.get("password");
    if (name === "" || email === "" || password === "") {
        return { status: 400, message: "All fields are required" };
    }
    else {
        try {
            await connectDB();
            let user = await User.findOne({ email: email });
            if (user) {
                return { status: 400, message: "Email already taken" };
            }
            else {
                let salt = bcryptjs.genSaltSync(10);
                password = bcryptjs.hashSync(password, salt);
                let newUser = new User({
                    name: name,
                    email: email,
                    password: password
                });
                await newUser.save();
                return { status: 200, message: "Signed up succesfully, please login" };
            }
        }
        catch (err) {
            return { status: 500, message: "Internal server error" };
        }
    }

}

export async function userLogin(currentState, formData) {
    let email = formData.get("email");
    let password = formData.get("password");
    if (email === "" || password === "") {
        return { status: 400, message: "All fields are required" };
    }
    else {
        try {
            await connectDB();
            let user = await User.findOne({ email: email });
            if (user) {
                let isMatch = await bcryptjs.compare(password, user.password);
                if (isMatch) {
                    let token = jwt.sign({
                        id: user._id,
                        name: user.name,
                        email: user.email
                    }, jwt_secret, { expiresIn: "2d" });
                    // let salt = bcryptjs.genSaltSync(10);
                    // hashedToken = bcryptjs.hashSync(token, salt);
                    cookies().set("userToken", token, {
                        path: "/",
                        maxAge: 60 * 60 * 24 * 2, // 2 day
                        sameSite: "lax",
                        secure: process.env.NODE_ENV === "production",
                        httpOnly: true,
                    });
                    return { status: 200, token: token, message: "Login successful" };
                }
                else {
                    return { status: 400, message: "Invalid Credentials" };
                }
            }
            else {
                return { status: 400, message: "Invalid Credentials" };
            }
        }
        catch (err) {
            console.log(err.message);
            return { status: 500, message: "Internal server error" };
        }

    }
}
