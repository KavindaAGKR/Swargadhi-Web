// index.js
import express from "express";
import dbConnect from "./config/dbConnect.js";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";
import productRoute from "./routes/productRoute.js";
import materialRoute from "./routes/materialRoute.js";
import feedBackRoute from "./routes/feedBackRoute.js";
import bodyParser from 'body-parser';

dotenv.config();
dbConnect();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/user', authRoute);
app.use('/api/product', productRoute);
app.use('/api/material', materialRoute);
app.use('/api/feedBack', feedBackRoute);

app.listen(PORT, () => {
    console.log(`Server is Running at PORT ${PORT}`);
});

app.use((err, req, res, next) => {
    if (createHttpError.isHttpError(err)) {
        res.status(err.status).send({ message: err.message });
    } else {
        res.status(500).send({ message: err.message });
    }
    // unknown error
    res.status(500).send({ message: "Unknown error" });
});

export default app;
