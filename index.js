import errorHandler from "./middlewares/errorHandler.js";
import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";
import errorHandler from "./middlewares/errorHandler.js";

connectDB();

const PORT = process.env.PORT || 5000;

app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
