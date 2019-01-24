const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const upload = require("../helpers/multer");


//Create new product 
router.post("/", upload.single("image"), (req, res) => {
  let product = {};
  
  Object.keys(req.body).forEach( key => product[key] = req.body[key]);
  
  if (req.file) product.image = req.file.url;
  
  Product.create(product)
      .then(product => (
        res.status(201)
           .json(product)
      ))
      .catch(err => (
        res.status(500)
           .json({ err, errorMessage: "Product wasn't created. Something went wrong"})
      ));
});

//Get all products
router.get("/", (req,res) => {
  Product.find()
      .then(products => {
          console.log(products);
          res.status(202).json(products)
      })
      .catch(err => {
          console.log(err)
      })
});

//Delete product
router.delete("/:id", (req,res) => {
  Product.findByIdAndDelete(req.params.id)
      .then(product => (
        res.status(200)
           .json(product)
      ))
      .catch(err => (
        res.status(500)
           .json({err, errorMessage: "Product wasn't deleted. Something went wrong"})
      ));
});


//Edit product
router.patch("/:id", upload.single("image"), (req, res) => {
  let product = {};

  Object.keys(req.body).forEach(key => {
      product[key] = req.body[key];
  });
  if(req.file) product.image = req.file.url;


  User.findByIdAndUpdate(req.params.id, {$set: product}, {new:true})
      .then(product => {
          res.status(200).json({product});
      })
});

module.exports = router;

