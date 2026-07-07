const User = require("../model/user.model");

async function createUser(req, res) {
    try {
        const user = await User.create(req.body);

        res.status(201).json({
            message: "User created successfully",
            data: user,
        });
    } catch (error) {
        res.status(400).json({
            message: "Error creating user",
            error: error.message,
        });
    }
}
async function getAllUsers(req, res) {
    try {
        const users = await User.find();

        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
async  function getUsersById(req,res){
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "User found",
            data: user,
        });
    } catch (error) {
        res.status(400).json({
           success:false,
            message: error.message,
        });
    }
} 
async function updateUser(req,res){
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true,runValidators: true });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: user,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}
async function deleteUser(req,res){
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = {
    createUser,
    getUsersById,
    getAllUsers,
    updateUser,
    deleteUser,
};