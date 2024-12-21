const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require('path');
const Chat = require("./models/Chat.js");
const methodOverride = require("method-override");
const ExpressError=require("./ExpressError");



app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); // for parsing the data
app.use(methodOverride("_method"));

main()
  .then(() => {
    console.log("Connection successful");
  })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
}

function asyncWrap(fn){
  return function(req,res,next){
    fn(req,res,next).catch((err)=>{
      next(err);
    });
  }
}

// Index route
app.get("/chats",  asyncWrap( async (req, res) => {
    let chats = await Chat.find();
   //  console.log(chats);
    res.render("chats", { chats });
  
}));





// New route
app.get("/chats/new", (req, res) => {
  res.render("new");
});
//Error middleware
app.use((err,req,res,next)=>{
  let {status=500,message="Some error Occured!"}=err;
  res.status(status).send(message);
})

// Edit route
app.get("/chats/:id/edit",  asyncWrap( async (req, res) => {

    let { id } = req.params;
    console.log("ID:", id); // Log the ID to check its value
    let chat = await Chat.findById(id);
    res.render("edit", { chat });
  
}));

// Create route
app.post("/chats", asyncWrap(async (req, res) => {
  
    let { message, to, from } = req.body;
    console.log(newChat);

    let newChat = new Chat({
      from: from,
      to: to,
      message: message,
      created_at: new Date()
    });
    await newChat.save(); // Save the new chat message to the database
    console.log(newChat);
    res.redirect("/chats");
  
}));

// Update route
app.put("/chats/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let { message: newMsg } = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id, { message: newMsg }, { runValidators: true, new: true });
    res.redirect("/chats");
  } catch (error) {
    console.error("Error updating chat message:", error);
    res.status(500).send("Error updating chat message");
  }
});


app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
