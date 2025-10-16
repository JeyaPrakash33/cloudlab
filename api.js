const express = require("express");
const app = express();
app.use(express.json());

let users = [{ id: 1, name: "Alice" }];
// GET all users
app.get("/users", (req, res) => res.json(users));

// GET user by id
app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  user ? res.json(user) : res.status(404).send("User not found");
});

// POST create user
app.post("/users", (req, res) => {
  const newUser = { id: users.length + 1, name: req.body.name };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update user
app.put("/users/:id", (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).send("User not found");
  user.name = req.body.name;
  res.json(user);
});

// DELETE user
app.delete("/users/:id", (req, res) => {
  users = users.filter(u => u.id != req.params.id);
  res.send("User deleted");
});

app.listen(3000, () => console.log("API running on http://localhost:3000"));

//npm init -y
//npm install
//npm install express
//node api.js