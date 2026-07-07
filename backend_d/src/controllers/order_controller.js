const Order = require("../model/order_model");

async function createOrder(req,res){
  try{
    const order = await Order.create(req.body);
    await order.populate("user");
    await order.populate("products.product");
    res.status(201).json({
      success:true,
      data: order,
    });
  }catch(error){
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}
async function getOrders(req,res){
  try{
    const orders = await Order.find()
    .populate("user")
    .populate("products.product");
    res.status(200).json({
        success: true,
        count: orders.length,
        data:orders
    });
  }catch(error){
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

async function getOrderById(req,res){
  try{
    const order = await Order.findById(req.params.id)
    .populate("user")
    .populate("products.product");
    if(!order){
      return res.status(404).json({
        success: false,
        message: "Order not Found",
      });
    }
    res.status(200).json({
      success:true,
      data:order,
    });
  }catch(error){
    res.status(400).json({
      success:false,
      message: error.message,
    });
  }
}

async function updateOrder(req,res){
  try{
    const order = await Order.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
      runValidators: true,
    })
    .populate("user")
    .populate("products.product");
    
    if(!order){
      return res.status(404).json({
        success: false,
        message: "Order Not Found",
      });
    }
    res.status(200).json({
      success:true,
      message: "Order Updated Successfully",
    });
  }
  catch(error){
    res.status(400).json({
      success:false,
      message: error.message,
    });
  }
}

async function deleteOrder(req,res){
  try{
    const order = await Order.findByIdAndDelete(req.params.id);
    
    if(!order){
      return res.status(404).json({
        success: false,
        message: "Order Not Found",
      });
    }
    res.status(200).json({
      success:true,
      message: "Order Deleted Successfully",
    });
  }
  catch(error){
    res.status(400).json({
      success:false,
      message: error.message,
    });
  }
}
module.exports = {
  createOrder,getOrders,getOrderById,updateOrder,deleteOrder
}













