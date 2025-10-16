const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;


app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb+srv://root:root@cluster0.fpkxzam.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Schema & Model
const orderSchema = new mongoose.Schema({
  name: String,
  address: String,
  payment: String,
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

//
// CRUD Routes
//

// 👉 Create Order
app.post("/api/orders", async (req, res) => {
    const order = new Order(req.body);
    await order.save();
    
});

// 👉 Read All Orders
app.get("/api/orders", async (req, res) => {
  
    const orders = await Order.find();
    res.json(orders)
});


// 👉 Update Order
app.put("/api/orders/:id", async (req, res) => {
  
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  })

// 👉 Delete Order
app.delete("/api/orders/:id", async (req, res) => {

    const order = await Order.findByIdAndDelete(req.params.id);
})

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));