const { Router } = require("express");

const userModel = require("../models/user.model.js");
const { isValidObjectId } = require("mongoose");

const userRouter = Router();

userRouter.get("/", async (req, res) => {
  const users = await userModel.find();

  res.json(users);
});

userRouter.post("/", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "email is required" });
  }

  const existUser = await userModel.findOne({ email: email });

  if (existUser) {
    return res.status(400).json({ message: "user already exists" });
  }
  const user = await userModel.create(req.body);
  res.json(user);
});

userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid Id" });
  }
  const user = await userModel.findById(id);
  if (!user) {
    return res.status(404).json({ message: "USER NOT FOUND {404}" });
  }
  res.json(user);
});

userRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  const deleteuser = await userModel.findByIdAndDelete(id);

  res.json(deleteuser);
});

userRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.json(updatedUser);
});

module.exports = userRouter;
