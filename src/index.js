import "dotenv/config.js";
import connectDB from "./db/index.js";
import { app } from "./app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log("Connected to Port Number ",process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("Mongo db Connection Failed !!!!", error);
  });
