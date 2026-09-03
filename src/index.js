import dotenv from "dotenv";
import express from "express";
import articlesRoutes from "./routes/article.js";
import categoriesRoutes from "./routes/categories.js";
import subscribersRoutes from "./routes/subscribers.js";
import commentsRoutes from "./routes/comments.js";
dotenv.config();

const app = express();
const PORT = 3000;

app.use("/articles", articlesRoutes);
app.use("/categories", categoriesRoutes);
app.use("/subscribers", subscribersRoutes);
app.use("/comments", commentsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
