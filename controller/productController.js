const { features } = require("process");
const productSchema = require("../models/productSchema");
const fs = require("fs");

//API for Add product by vendor
const addProduct = async (req, res) => {
  try {
    const newProduct = new productSchema(req.body);
    if (newProduct != null) {
      await newProduct.save();
      res.status(200).json({
        success: true,
        message: "product added successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "product not added",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//add getall product
const getallProduct = async (req, res) => {
  try {
    const productData = await productSchema.find(req.body);
    if (productData != null) {
      res.status(200).json({
        success: true,
        message: "Data list below",
        data: productData,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "data not found ",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//delete productId
const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const productData = await productSchema.findByIdAndDelete(
      productId,
      req.body
    );
    if (productData) {
      res.status(200).json({
        success: true,
        message: "delete successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "try again",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//API for a product update
const updateProductbyName = async (req, res) => {
  const { productId } = req.params;

  try {
    const updatedProduct = await productSchema.findByIdAndUpdate(
      productId,
      req.body
    );
    if (updatedProduct) {
      res.status(200).json({
        success: true,
        message: "updated successfully",
        updatedProduct: updatedProduct,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "id not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  addProduct,
  getallProduct,
  deleteProduct,
  updateProductbyName
}

