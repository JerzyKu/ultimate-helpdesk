const User = require('../models/User')
const bcrypt = require('bcryptjs')


async function  isAdminExist() {
  const admin = await User.find({username: 'admin'})

  if(!admin.length ){
      const hashedPwd = await bcrypt.hash("zaq1@WSX", 10)
      const newAdmin = await User.create({
          "username": "admin",
          "password": hashedPwd,
          "roles": [
              "User",
              "Admin"
            ]
        })
        console.log("Admin account created");
    } else {
        console.log("Admin account exist");
    }
  
}

module.exports = {
    isAdminExist
}