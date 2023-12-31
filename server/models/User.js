const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { 
        type: String 
    },
    lastName: { 
        type: String 
    },
    email: { 
        type: String 
    },
    jobTitle: { 
        type: String 
    },
    username: {
      type: String,
      require: true,
      unique: true,
    },
    active: {
      type: Boolean,
      default: true
    },
    roles: {
      type: [String],
      default: ['User']
    }
    ,
    password: {
      type: String,
      require: true
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
