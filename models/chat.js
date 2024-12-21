const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
   from: {
      type: String,
      required: true
   },
   to: {
      type: String,
      required: true
   },
   message: {
      type: String,
      maxLen: 50
   },
   created_at: { // Change the field name to created_at
      type: Date
   }
});

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
