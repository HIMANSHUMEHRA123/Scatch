const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config")
const productModel = require("../models/product-model");

 
router.post("/create",upload.single("image"), async (req,res) => {
   
try{ let { name , price , discount, bgcolor ,panelcolor, textcolor} = 
        req.body;

     let product = await productModel.create({
        image: req.file.buffer,
        price,
        discount,
        name,
        bgcolor,
        textcolor,
        panelcolor,
        })
      req.flash("success","Product created successfully");
     res.redirect("/owners/admin");
     }catch(err){
        console.error("Error creating product:", err);
         res.send(err.message);
     } 
})
module.exports = router;
