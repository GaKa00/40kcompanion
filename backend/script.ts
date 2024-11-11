
import express from "express";
import userRoutes from "./resources/users/users.routes";
import bookRoutes from "./resources/books/books.routes";
import cors from "cors";
import bodyParser from "body-parser";


import path from "path";



const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 3000;


app.use("/api", userRoutes);
app.use("/api", bookRoutes);


app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


