import express from "express";
import cors from "cors";
import connectDB from "./utils/db.js";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.routes.js";
import cookieParser from "cookie-parser";
dotenv.config({});

const app = express();

const PORT = process.env.PORT || 3000;


app.get("/", (_, res)=>{
    return res.status(200).json({
        message:"Welcome! ",
        success:true
    })
})

//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))


// api
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);





app.listen(PORT, ()=>{
    console.log(`server is listen on port ${PORT}`);
    connectDB();
})

