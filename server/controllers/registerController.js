const User = require('../model/User')
const bcrypt = require('bcryptjs')

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username(user) and password(pwd) are required.' }) //400: bad request. 
    
    // check for duplicate usernames in the DB 
    const duplicate = await User.findOne({username: user}).exec()
    if (duplicate) return res.sendStatus(409) //Conflict 
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10)
        //create and store new user 
        const resunt = await User.create( {
            "username": user, 
            "password": hashedPwd
        })
        // console.log("🚀 ~ file: registerController.js:19 ~ handleNewUser ~ resunt:", resunt)
        res.status(201).json({ 'success': `New user ${user} created!` })
    } catch (err) {
        return res.status(500).json({ 'message': err.message }) //500: srv err. 
    }
}

module.exports = { handleNewUser }