const express = require("express");
const app = express();
const config = require("../Config/default.json");

const PORT =  config.port || 9999;
const mongoose = require("mongoose");

const cors = require('cors');
app.options("*",cors());

app.use(express.json());

//routes
app.use("/api" ,require("./Routes/forecast"));
app.use("/api/auth" ,require("./Routes/auth"));
app.use(require("./Routes/city"));
app.use("/api",require("./Routes/users"));

app.get("/", (req,res)=>{
   res.send("Hello")
})

async function RunServer()
{
   try
   {
      await mongoose.connect(config.url,
          {
             useCreateIndex:true,
             useUnifiedTopology: true,
             useNewUrlParser:true
          })
      app.listen(PORT, ()=>console.log(`The server is running on the PORT ${PORT}`));


   }
   catch (err)
   {
      console.log(err);
      process.exit(1);
   }
}

RunServer();