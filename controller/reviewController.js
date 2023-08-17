const reviewSchema = require("../models/reviewSchema");

//add review
const addReview = async (req, res) => {
  try {
    const newReview = new reviewSchema(req.body);
    if (newReview != null) {
      await newReview.save();
      res.status(200).json({
        success: true,
        message: "Review added successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Try again review not added ",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//list of all review
const listofReview = async (req, res) => {
  try {
    const reviews = await reviewSchema.find();
    res.status(200).json({
      success: true,
      message: "Here are all the Reviews",
      listAll: reviews,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};

// review remove/delete
const removeReview = async (req, res) => {
  const { ReviewID } = req.params;
  try {
    const reviewToRemove = await reviewSchema.findByIdAndRemove(ReviewID);
    if (reviewToRemove) {
      res.status(200).json({
        success: true,
        message: "data deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        error: "ReviewID not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//update review
const updateReview = async (req, res) => {
  const { ReviewID } = req.params;
  try {
    const updatetoReview = await reviewSchema.findByIdAndUpdate(ReviewID);
    if (updatetoReview) {
      res.status(200).json({
        success: true,
        message: " Review updated successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        error: "ReviewID not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
module.exports = { addReview, listofReview, removeReview, updateReview };
