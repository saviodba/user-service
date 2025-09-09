import cors from "cors";
import "dotenv/config";
import express from "express";
import { routes } from "./adapters/routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000',  
  credentials: false // se estiver usando cookies/autenticação
}));

app.use(routes)


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});