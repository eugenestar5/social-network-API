const { Schema, model } = require("mongoose");
const thoughtSchema = require("./Thought");

const userSchema = new Schema({
    username: { 
        type: String, 
        unique: [true, "Username is already in use!"], 
        required: [true,"Username should not be empty"], 
        trim: true 
    },

    email: {
        type: String,
        unique: [true, "Email already in use!"], 
        required:[true,"Email should not be empty"], 
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
      },

    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: "Thought",
    },],

    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    },],
    },
    {
      toJSON: {
        virtuals: true
      },
      id:false,
    }
  );
  const User = model("User", userSchema);

  userSchema.virtual("friendCount").get(function(){
    return this.friends.length;
  });

  module.exports = User;
  