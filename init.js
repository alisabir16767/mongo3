const mongoose = require("mongoose");
const Chat = require("./models/Chat.js");


main()
  .then(() => {
    console.log("Connection successful");
  })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
}

let allChats=[
   {
      from: "neha",
      to: "priya",
      message: "send me your exam sheet",
      created_at: new Date(),
   },
   {
      from: "sabir",
      to: "ali",
      message: "send me picture",
      created_at: new Date(),
   },
   {
      from: "tufail",
      to: "ansari",
      message: "I love you",
      created_at: new Date(),
   },
   {
      from: "afsar",
      to: "ahmed",
      message: "eat",
      created_at: new Date(),
   },
   {
      from: "satyakam ",
      to: "tyagi",
      message: "sleep",
      created_at: new Date(),
   },
   {
      from: "prhant",
      to: "dubey",
      message: "code",
      created_at: new Date(),
   },
   {
      from: "ezaz",
      to: "ali",
      message: "send me yxqasour exam sheet",
      created_at: new Date(),
   },
   {
      from:"Raes",
      to:"ansari",
      message:"eskmlenaf",
      created_at: new Date()
   }
]

Chat.insertMany(allChats);



 

