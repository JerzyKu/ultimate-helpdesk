const User = require('../model/User')
const bcrypt = require('bcryptjs')


const asyncHandler = require("express-async-handler");

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = async (req, res) => {
    const users = await User.find().select("-password -__v").lean()
    if (!users) return res.status(204).json({ "message": "no users found." })
    res.json(users)
}

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, roles } = req.body;
  
    //confirm data
    if (!username || !password ) {
      return res.status(400).json({ message: "All field are requred" }); // 400 - badrequest
    }
  
    //chceck for duplicate
    const duplicate = await User.findOne({ username }).lean().exec(); // if you pass in use exec
    if (duplicate) {
      console.log("duplicat: ", duplicate);
      return res.status(409).json({ message: "duplicate username" }); // 409 - conflict
    }
  
    // hash password
    const hashedPwd = await bcrypt.hash(password, 10);
  
    const userObject = { username, password: hashedPwd };

    if(roles){
      userObject.roles = roles
    }
  
    //Create and store new user
    const user = await User.create(userObject);
  
    if (user) {
      //created
      res.status(201).json({ message: `New user ${username}` }); // 201 - created
    } else {
      res.status(400).json({ message: "Invalid user data" }); // 400 - badrequest
    }
  });

module.exports = {
    getAllUsers,
    createNewUser
}