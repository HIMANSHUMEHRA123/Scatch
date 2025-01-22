const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");
const path = require('path');
const expressSession = require("express-session");
const flash = require("connect-flash");
const env = require('dotenv').config();
const db = require("./config/mongoose-Connection");
const ownersRouter = require("./routes/ownerRouter");
const productsRouter = require("./routes/productRouter");
const usersRouter = require("./routes/userRouter");
const indexRouter = require('./routes/index');
 
 

app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cookieparser());
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: process.env.EXPRESS_SESSION_SECRET
 })
);
app.use(flash());
app.use(express.static(path.join(__dirname,'public')));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine","ejs");

// console.log("NODE_ENV:", process.env.NODE_ENV);
// console.log("Config Directory:", process.env.NODE_CONFIG_DIR);
// console.log("NODE_ENV_JWT_KEY",JWT_KEY="himanshu")

app.use('/', indexRouter);
app.use("/owners",ownersRouter);
app.use("/users",usersRouter);
app.use("/products",productsRouter);


 

app.listen(3000)