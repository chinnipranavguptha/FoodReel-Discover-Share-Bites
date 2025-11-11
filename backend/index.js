const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRoutes = require("../backend/routes/authRoutes")
const foodroutes = require("./routes/foodroutes")
const mongodb = require('./db/db');
const cors = require("cors");

dotenv.config();
const app = express();
mongodb();
// Allow the frontend dev server on either 5173 or 5174 (vite/react sometimes uses either port)
// Use a function to validate the incoming origin so credentials can remain true.
// Allow the frontend dev servers (Vite/React) on ports 5173 and 5174.
// Use a function so the Access-Control-Allow-Origin header echoes the
// incoming Origin when it's allowed (this makes preflight succeed).
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
app.use(cors({
    origin: function(origin, callback) {
        // allow requests with no origin (like curl, Postman)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        }
        return callback(new Error('CORS policy: origin not allowed'));
    },
    credentials: true,
}));

app.use(cookieParser())
app.use(express.json())




app.get('/', (req, res) => {
    res.send('Hello buddy');
    console.log('MONGO_URL >>', process.env.MONGO_URL);
});

app.use("/api/auth", authRoutes);
app.use("/api/food", foodroutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));