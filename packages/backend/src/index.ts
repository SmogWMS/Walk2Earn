import express from "express";
import dotenv from "dotenv";
import relayerRouter from "./relayer";
dotenv.config();

const app = express();
app.use(express.json());

app.use("/api", relayerRouter);

const port = Number(process.env.PORT || 8080);
app.listen(port, () => {
  console.log(`Relayer listening on ${port}`);
});
