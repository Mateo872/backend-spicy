import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 100,
    required: true,
  },
  imageOne: {
    type: String,
    required: true,
  },
  imageTwo: {
    type: String,
    required: true,
  },
  imageThree: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    minlength: 3,
    maxlength: 300,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
  },
  sizes: {
    type: Array,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
