const express = require('express');
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post("/login", async (req, res) => {
  const user = await User.findOne({email: req.body.email});
   if(!user) return res.status(404).json({msg: "Email not valid"});

   let validPassword = bcrypt.compareSync(req.body.password, user.password);
   if(!validPassword) return res.status(500).json({msg: "Incorrect Password"});

   const token = jwt.sign(
       {id: user._id},
       process.env.SECRET,
       {
           expiresIn: 8600
       });

       delete user._doc.password;

   res.status(200).json({user, token});
});

router.post("/register", (req, res) => {

   if(req.body.password !== req.body.confirmPassword) return res.status(500).json({msg: "Passwords don't match"});

   const salt = bcrypt.genSaltSync(256);
   const hashedPassword = bcrypt.hashSync(req.body.password, salt);

   User.create({
       username: req.body.username,
       email: req.body.email,
       password: hashedPassword
   })
       .then(() => {
           res.status(201).json({msg: "User created"})
       })
       .catch(err => {
           res.status(500).json({err, msg: "There has been an error"})
       })
});

module.exports = router;