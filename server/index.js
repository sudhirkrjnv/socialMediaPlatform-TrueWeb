import express from "express";

import connectDB from "./utils/db.js";
import dotenv from "dotenv";
dotenv.config({});

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`server is listen on port ${PORT}`);
    connectDB();
})

