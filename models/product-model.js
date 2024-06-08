const mongoose = require("mongoose");


const productSchema = mongoose.Schema({
     image: String,
     name: String,
     discount: {
        type: Number,
        defalut: 0,
     },
     bgcolor: String,
     panelcolor: String,
     textcolor: String,
})

module.export = mongoose.model("product",productSchema);