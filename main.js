const express = require("express");
const app = express();
const connectDb = require("./db/db.js");
const userRouter = require("./users/users.route.js");
app.use(express.json());
connectDb();

app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(3000, () => {
  console.log("running on http://localhost:3000");
});
