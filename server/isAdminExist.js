const User = require('./model/User')
const bcrypt = require('bcryptjs')


async function  isAdminExist() {
  const admin = await User.find({username: 'Admin'})

  if(!admin.length ){
      const hashedPwd = await bcrypt.hash("zaq1@WSX", 10)
      const newAdmin = await User.create({
          "username": "Admin",
          "pwd": hashedPwd,
          "roles": {
              "User": 2001,
              "Admin": 6666
            }
        })
        console.log("Admin account created");
    } else {
        console.log("Admin account exist");
    }
  
}

module.exports = {
    isAdminExist
}