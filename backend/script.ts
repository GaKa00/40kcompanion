
import express from "express";
import userRoutes from "./resources/users/users.routes";
import bookRoutes from "./resources/books/books.routes";
import cors from "cors";
import bodyParser from "body-parser";


import path from "path";



const app = express();


app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());

const port = 3000;


app.use("/api", userRoutes);
app.use("/api", bookRoutes);


app.use(express.static(path.join(__dirname, "public")));


app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


