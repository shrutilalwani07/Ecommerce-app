const mongoose = require("mongoose")
const reviewSchema = new mongoose.Schema({
    productReview: {
        type: String,
    },
    productRating: {
        type: String,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "company"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "user"
    },
    isActive: {
        type: Boolean,
        require: true
    },
})
reviewSchema.set('timestamps',true)
module.exports = mongoose.model('review', reviewSchema)