"use server";

const mongoose = require("mongoose");
const dbURL = process.env.DB_URL;

export default async function connectDB() {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(dbURL).then(() => {
            console.log("Connected to DB");
        }).catch((err) => {
            console.log("DB Connection Error = ", err.message);
        });
    }
}