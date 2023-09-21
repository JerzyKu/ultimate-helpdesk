const User = require("../model/User");
const bcrypt = require("bcryptjs");

const asyncHandler = require("express-async-handler");

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password -__v").lean();
  if (!users) return res.status(204).json({ message: "no users found." });
  res.json(users);
};

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
  const { username, password, roles, firstName, lastName, email, jobTitle } =
    req.body;
  //confirm data
  if (!username || !password) {
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

  const userObject = {
    username,
    password: hashedPwd,
    firstName,
    lastName,
    email,
    jobTitle,
  };

  if (roles) {
    userObject.roles = roles;
  }

  // !firstName ?? (userObject.firstName = firstName)

  //Create and store new user
  const user = await User.create(userObject);

  if (user) {
    //created
    res.status(201).json({ message: `New user ${username}` }); // 201 - created
  } else {
    res.status(400).json({ message: "Invalid user data" }); // 400 - badrequest
  }
});

// @desc Update user
// @route PUT /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.sendStatus(400);
  }
  const user = await User.findOne({ _id: id }).exec();
  if (!user) return res.status(400).json({ message: `No user with Id: ${id}` });

  const { password, roles, firstName, lastName, email, jobTitle, active} = req.body;

  if (password){
    const hashedPwd = await bcrypt.hash(password, 10);
    user.password = hashedPwd
  }

  if (firstName) user.firstName = firstName;
  if (roles) user.roles = roles;
  if (lastName) user.lastName = lastName;
  if (email) user.email = email;
  if (jobTitle) user.jobTitle = jobTitle;
  if (active) user.active = active;

  const result = await user.save();
  res.json(result);
});

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
};
