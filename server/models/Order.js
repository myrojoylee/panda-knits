const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0.99,
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  personal: [
    new Schema({
      name: {
        type: String,
      },
      data: {
        type: String,
        default: "",
      },
    }),
  ],
});

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  products: [orderProductSchema],
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
