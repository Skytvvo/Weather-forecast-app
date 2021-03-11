const express = require("express");
const app = express();

const PORT = process.env.PORT || 9999;

const cors = require('cors');
app.options("*",cors());

//routes
const forecast = require("./Routes/forecast");
const login = require("./Routes/login");
const reg = require("./Routes/reg");
const city = require("./Routes/city");
const users = require("./Routes/users");

app.use(express.json());
app.use(forecast);
app.use(login);
app.use(reg);
app.use(city);
app.use(users);

app.get("/", (req,res)=>{
   res.send("Hello")
})

app.listen(PORT, ()=>console.log(`The server is running on the PORT ${PORT}`));


