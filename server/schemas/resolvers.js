const { User, Product, Category, Order } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const stripe = require("stripe")(
  "sk_test_51NimT1ADpz9jWnXhePQBaHDuUdF87cua3deqCADAAH9mUoCo1AKMLUktBPWAgUAyqcUWyU2OxN6BG6LNsPsX3HJB00nNg3lzbv"
);
require("dotenv").config();

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name,
        };
      }
      const products = await Product.find(params).populate("category");
      return products;
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id)
        .populate("category")
        .populate("personal");
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "category",
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw AuthenticationError;
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const order = await Order.findById(_id);
        return order;
      }

      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address.");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw AuthenticationError;
    },

    checkout: async (parent, args, context) => {
      const url = process.env.DOMAIN;
      let order = null;
      try {
        order = await Order.create({
          products: args.products.map((product) => {
            product.category = product.category._id;
            return product;
          }),
        });
      } catch (e) {
        console.error(e);
      }

      try {
        let line_items = [];

        line_items = args.products.map((product) => {
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: product.name,
              },
              unit_amount_decimal: Math.round(product.price * 100),
              tax_behavior: "exclusive",
            },
            quantity: product.purchaseQuantity,
          };
        });

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items,
          mode: "payment",
          success_url: `${url}/success?orderNumber=${order._id}`,
          cancel_url: `${url}`,
        });

        return { sessionurl: session.url };
      } catch (e) {
        console.error(e);
      }
      throw new Error("Could not complete checkout!!!!");
    },

    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(
        _id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
