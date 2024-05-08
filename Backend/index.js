import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from "dotenv";
import express from "express";
import i18next from "i18next";
import { createRequire } from "module";
import dbConnect from "./config/dbConnect.js";
import adminRoute from "./routes/adminRoute.js";
import feedBackRoute from "./routes/feedBackRoute.js";
import materialRoute from "./routes/materialRoute.js";
import productRoute from "./routes/productRoute.js";
import doctorRoute from "./routes/doctorRoute.js";
import userRoute from "./routes/userRoute.js";
import treatmentRoute from "./routes/treatmentRoute.js"
import global_English from "./translations/English/global.json" assert { type: "json" };
import global_Sinhala from "./translations/Sinhala/global.json" assert { type: "json" };
import cartRoute from "./routes/cartRoute.js";

const require = createRequire(import.meta.url);

// Suppress experimental JSON module import warning
require('module').Module._initPaths();

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
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '500mb' }));
app.use('/public', express.static('public'))
app.use('/api/user', userRoute);
app.use('/api/product', productRoute);
app.use('/api/material', materialRoute);
app.use('/api/feedBack', feedBackRoute);
app.use('/api/admin', adminRoute);
app.use('/api/doctor', doctorRoute);
app.use('/api/treatment', treatmentRoute);
app.use('/api/cart', cartRoute);

app.listen(PORT, () => {
    console.log(`Server is Running at PORT ${PORT}`);
});
