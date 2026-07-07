const express = require('express');
const cors = require('cors');
const userRoutes = require("./routes/user.route");
const app=express();
app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/products", require("./routes/product.route"));
app.use("/orders", require("./routes/order_routes"));
app.get('/',(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the backend API Running",
    });
});
module.exports=app;