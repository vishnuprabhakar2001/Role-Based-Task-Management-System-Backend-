// index.js
import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";
import errorHandler from "./middlewares/errorHandler.js";

connectDB();

const PORT = process.env.PORT || 3000;

// Error handler (last middleware)
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
