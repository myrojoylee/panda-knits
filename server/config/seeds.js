const db = require("./connection");
const { User, Product, Category } = require("../models");
const cleanDB = require("./cleanDB");
require("dotenv").config();

db.once("open", async () => {
  await cleanDB("Category", "categories");
  await cleanDB("Product", "products");
  await cleanDB("User", "users");

  const categories = await Category.insertMany([
    { name: "Scarves" },
    { name: "Gloves" },
    { name: "Hats" },
    { name: "Baby" },
    { name: "Seasonal" },
  ]);

  console.log("categories seeded");

  const products = await Product.insertMany([
    {
      name: "Gryffindor Scarf",
      description: `A Harry Potter-inspired swirly scarf that's sure to warm your neck on your next trip to Hogwarts!`,
      image: "gryffindor-scarf-stripe.png",
      category: categories[0]._id,
      price: 29.99,
      quantity: 0,
      personal: [],
    },
    {
      name: `S'mores Mittens`,
      description: `A sweet pair to wear while you sip on your hot cocoa.`,
      image: "smores-mittens.png",
      category: categories[1]._id,
      price: 19.99,
      quantity: 0,
      personal: [],
    },
    {
      name: "Pumpkin Spice Hat",
      description: `Who says pumpkin spice is only a flavor for your fall coffee drink? Match the falling leaves with this laced hat!`,
      image: "pumpkin-spice-hat.png",
      category: categories[2]._id,
      price: 24.99,
      quantity: 0,
      personal: [],
    },
    {
      name: `Infant hat & sweater set`,
      description: `Be ready for your newborn's photo shoot with this cute ensemble!`,
      image: "baby-hat-sweater.png",
      category: categories[3]._id,
      price: 39.99,
      quantity: 0,
      personal: [],
    },
    {
      name: "Jumbo Christmas Stocking",
      description: `Want a stocking that looks like Grandma made it? Get a customized Christmas stocking that's sure to bring in the holiday cheer year after year.`,
      image: "christmas-stocking-snowman.png",
      category: categories[4]._id,
      price: 29.99,
      quantity: 0,
      personal: [
        {
          name: "personalName",
          data: "",
        },
      ],
    },
  ]);

  console.log("products seeded");

  console.log("All done seeding!");

  await User.create({
    firstName: "Minnie",
    lastName: "Mouse",
    email: "minnie@clubhouse.com",
    password: "Minnie1234",
    orders: [
      {
        products: [products[0], products[0], products[4]],
      },
    ],
  });

  console.log("users seeded");

  process.exit();
});
