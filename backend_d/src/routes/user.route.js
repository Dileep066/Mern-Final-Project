const express = require("express");
const router = express.Router();

const {
    createUser,
    getUsersById,
    getAllUsers,
    updateUser,
    deleteUser,
} = require("../controllers/user.controller");

router.post("/", createUser);
router.get("/", getAllUsers);      // GET /users
router.get("/:id", getUsersById);  // GET /users/:id
router.put("/:id", updateUser);    // PUT /users/:id
router.delete("/:id", deleteUser); // DELETE /users/:id
module.exports = router;