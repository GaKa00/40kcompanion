
import express from "express";
import userRoutes from "./resources/users/users.routes";
import bookRoutes from "./resources/books/books.routes";
import cors from "cors";
import bodyParser from "body-parser";



const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 3000;


app.use("/api", userRoutes);
app.use("/api", bookRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
