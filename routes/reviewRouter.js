const express = require("express");
const router = express.Router();

const  review = require("../controller/reviewController")

router.post("/addReview", review.addReview)
router.get("/listreview", review.listofReview)
router.delete("/delete/:ReviewID",review.removeReview)
router.patch("/updatereview/:ReviewID",review.updateReview)
module.exports=router