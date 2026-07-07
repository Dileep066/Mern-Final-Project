const mongoose=require("mongoose");
const productSchema=new mongoose.Schema({
    product_name:{  
        type:String,
        required:true,
        trim:true,
    },
    price:{
        type:Number,
        required:true,
        min:0,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    


},
{
    timestamps:true,
}
);

module.exports=mongoose.model("Product",productSchema);
