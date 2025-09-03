import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt, { genSalt } from "bcrypt";
import validator from "validator";

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body; //taking the email and password through axios
  try {
    const user = await userModel.findOne({ email }); //checks whether the email is available or  not
    if (!user) {
      //if email is not availble then
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password); //checking the user entered password with the password that is stored in the database in hashed format,using the bcrypt to decrypt
    if (!isMatch) {
      //if they are not matched returns invalid
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id); //if login credentials are true ,then it creates the token with the id,name,profile,email
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error logging in" });
  }
};



// Function to create JWT token
//creating the token that contains the id,name ,profileImage and email
const createToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET)
}

const registerUser = async (req, res) => {
  const { email, name, password } = req.body; //taking the email,name,password from the user ,they are sending through the axios
  try {
    // checking is user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "user already exists" });
    }

    // validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter valid email" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "please enter a strong password",
      });
    }

    // hasjing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { loginUser, registerUser };