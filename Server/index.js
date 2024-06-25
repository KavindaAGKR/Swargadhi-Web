import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import i18next from 'i18next';
import { createRequire } from 'module';
import path from 'path'; // Import the path module
import dbConnect from './config/dbConnect.js';
import adminRoute from './routes/adminRoute.js';
import feedBackRoute from './routes/feedBackRoute.js';
import materialRoute from './routes/materialRoute.js';
import productRoute from './routes/productRoute.js';
import doctorRoute from './routes/doctorRoute.js';
import userRoute from './routes/userRoute.js';
import treatmentRoute from './routes/treatmentRoute.js';
import global_English from './translations/English/global.json' assert { type: 'json' };
import global_Sinhala from './translations/Sinhala/global.json' assert { type: 'json' };
import cartRoute from './routes/cartRoute.js';
import orderRoute from './routes/orderRoute.js';
import optionRoute from './routes/optionRoute.js';

const require = createRequire(import.meta.url);

require('module').Module._initPaths();
i18next.init({
    interpolation: { escapeValue: false },
    lng: 'en',
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
app.use('/public', express.static('public'));
app.use('/api/user', userRoute);
app.use('/api/product', productRoute);
app.use('/api/material', materialRoute);
app.use('/api/feedBack', feedBackRoute);
app.use('/api/admin', adminRoute);
app.use('/api/doctor', doctorRoute);
app.use('/api/treatment', treatmentRoute);
app.use('/api/cart', cartRoute);
app.use('/api/orders', orderRoute);
app.use('/api/option', optionRoute);

// // Serve static files from the React app
// app.use(express.static(path.join(path.resolve(), 'client/build')));

// app.get('/reset/:token', (req, res) => {
//     res.sendFile(path.join(path.resolve(), 'client/build', 'index.html'));
// });

// // Handle all other routes with the React app
// app.get('*', (req, res) => {
//     res.sendFile(path.join(path.resolve(), 'client/build', 'index.html'));
// });

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
});

