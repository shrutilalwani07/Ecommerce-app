const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    productName: {
        type: String,
    },
    productDescription:{
        type: String,
    },
    productPrice: {
        type: Number,
    },
    productImage: {
        type: String,
    },
    productCompany: {
        type: String,
    },
    //productCategory: {
        //type: String,
   // }
    isActive: {
        type: Boolean,
        //require: true,
        default: true,
    },
})
productSchema.set('timestamps',true)
module.exports = mongoose.model('product', productSchema)