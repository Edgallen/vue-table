import express from "express";
import mongoose from "mongoose";
import router from "./router.js";
import cors from "cors";

const PORT = 5000;
const dbURL = "mongodb://localhost:27017/tableVue";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);
// middleware для проверки валидности JSON body
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.sendStatus(400);
  }
  next();
});

async function startApp() {
  try {
    mongoose.connect(dbURL);
    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  } catch (e) {
    e;
  }
}

startApp();
