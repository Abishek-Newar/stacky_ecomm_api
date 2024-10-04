import cors from "cors";
import express from "express";
import { dbconnection } from "./src/api/config/db.js";
import { createRouter } from "./src/infrastructure/route.js";
import env from "./src/infrastructure/env.js";

const app = express();
const port = env.APPPORT;
app.use(
  cors({
    origin: "*",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
    allowedHeaders: "Content-Type, Authorization",
  })
);
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

dbconnection();
app.get('/', (req, res) => {
  console.log('Example endpoint hit');
  res.send('Stacky Ecomm API Working');
});


app.use("/v1", createRouter());

app.listen(port, () => {
  console.log(`APP listening on port:${port}`); 
});
