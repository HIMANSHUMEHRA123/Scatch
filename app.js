const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");
const path = require('path');
 const db = require("./config/owner-Connection");
 const ownersRouter = require("./routes/ownerRouter");
 const productsRouter = require("./routes/productRouter");
 const usersRouter = require("./routes/userRouter");

app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cookieparser());
app.use(express.static(path.join(__dirname,"public")));
app.set("views engine","ejs");

app.use("/owners",ownersRouter);
app.use("/products",productsRouter);
app.use("/users",usersRouter);

app.listen(3000);