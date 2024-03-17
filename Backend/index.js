import express from "express";
import dbConnect from "./config/dbConnect.js";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";
import productRoute from "./routes/productRoute.js";
import adminRoute from "./routes/adminRoute.js"
//import materialRoutes from "./routes/materilaRoutes.js"
import materialRoute from "./routes/materialRoute.js"
import feedBackRoute from "./routes/feedBackRoute.js"
import bodyParser from 'body-parser';
import global_English from "./translations/English/global.json" assert { type: "json" };
import global_Sinhala from "./translations/Sinhala/global.json" assert { type: "json" };
import i18next from "i18next";

import cors from 'cors'

i18next.init({
    interpolation: { escapeValue: false },
    lng: "en",
    resources: {
        en: {
            global: global_English,
        },
        sin: {
            global: global_Sinhala,
        },
    },
});

const app = express();

dotenv.config();
dbConnect();

const PORT = process.env.PORT || 4000;
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit:'500mb'}));

app.use('/api/user', authRoute);
app.use('/api/product', productRoute);
app.use('/api/material',materialRoute);
app.use('/api/feedBack', feedBackRoute);
app.use('/api/admin',adminRoute);
app.listen(PORT, () => {
    console.log(`Server is Running at PORT ${PORT}`);
});




