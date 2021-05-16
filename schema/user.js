const mongoose = require("mongoose");
const passwordHash = require("password-hash");
const jwt = require("jwt-simple");
const config = require("../config/config");

require('mongoose-type-email');

const user = mongoose.Schema(//mongoose user model
  {
    name: {
      type: String,
      required: true
    },
    email: { // unique param email used to search
      type: mongoose.SchemaTypes.Email,
      lowercase: true,
      trim: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    city:[{   // array of cities related to user
      type: String       
    }]   
  },
  { timestamps: { created: "created" } }
);

user.methods = {
  authenticate: function(password) {
    return passwordHash.verify(password, this.password);
  },
  getToken: function() {  // returns token for the created user
    return jwt.encode(this, config.secret);
  }
};

module.exports = mongoose.model("User", user);