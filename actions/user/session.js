"use server";

const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;

export async function isValidToken(token) {
    try {
        let decoded = jwt.verify(token, jwt_secret);
        console.log(decoded);
        return true;
    }
    catch (err) {
        console.log(err.message);
        return false;
    }
}