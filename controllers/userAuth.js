// const User = require("../models/user");
// const jwt = require("jsonwebtoken");

// // handle errors
// const handleErrors = (err) => {
//   let errors = { email: "", password: "" };

// //incorrect email
//   if(err.message==='incorrect email'){
//     errors.email='that email is not registered';
//   }

// //incorrect password
//   if (err.message === "incorrect password") {
//     errors.password = "that password is incorrect";
//   }


// // duplicate email error
//   if (err.code === 11000) {
//     errors.email = "that email is already registered";
//     return errors;
//   }

// // validation errors
//   if (err.message.includes("user validation failed")) {
//     Object.values(err.errors).forEach(({ properties }) => {
//       errors[properties.path] = properties.message;
//     });
//   }

//   return errors;
// };

// // create json web token
// const maxAge = 3 * 24 * 60 * 60;
// const createToken = (id) => {
//   return jwt.sign({ id }, "kalaks secret", {
//     expiresIn: maxAge,
//   });
// };

// // controller actions
// module.exports.signup_get = (req, res) => {
//   res.render("signup");
// };

// module.exports.login_get = (req, res) => {
//   res.render("login");
// };

// // signup action
// module.exports.signup_post = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.create({ email, password });
//     const token = createToken(user._id);
//     res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
//     res.status(201).json({ user: user._id });
//   } catch (err) {
//     const errors = handleErrors(err);
//     res.status(400).json({ errors });
//   }
// };

// // login action
// module.exports.login_post = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.login(email, password);
//         const token = createToken(user._id);
//         res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
//     res.status(200).json({user:user._id})
//   } catch (err) {
//     const errors = handleErrors(err);
//     res.status(400).json({ errors });
//   }
// };

// // logout action
// module.exports.logout_get=(req,res)=>{
//   res.cookie('jwt','',{maxAge:1});
//   // res.redirect('/');
//   res.send("user logged out");
// }


const User = require("../models/user");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    // create a token
    const token = createToken(user._id);
    res.status(200).json({ email:email,token: token ,id:user._id});
  } catch (error) {
    res.json({ error: error.message });
  }
};


// signup a user
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    // create a token
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.json({ error: error.message });
  }
};



module.exports = { signupUser, loginUser };