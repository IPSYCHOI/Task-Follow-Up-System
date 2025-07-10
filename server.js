import { config } from 'dotenv';
import app from './app.js'
import dbconnect from "./config/dbConnect.js"

config()
const port = process.env.PORT || 3000;
dbconnect()
    .then(() => {
        app.listen(port, () => console.log("🚀 Server running on port " + port))
    })
    .catch((err) => {
        console.error("❌ Failed to connect DB or start server:", err.message);
    });


