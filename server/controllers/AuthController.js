import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import pkg from "bcryptjs";
import { request } from "express";
import cloudinary from "cloudinary";
import { renameSync, unlinkSync } from "fs";
import path from "path";


const { compare } = pkg;

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email and passsword is required");
    }

    const user = await User.create({ email, password });

    res.cookie("jwt", createToken(email, user._id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });
    return res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
       
        profileSetup: user.profileSetup,
      },
    });
  } catch (err) {
    console.log({ err });
    if(err.errorResponse.code === 11000){
      return res.status(400).send("Email already exists");
    }
    return res.status(500).send("internal server error");
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email and passsword is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("Email with given email not found");
    }

    const auth = await compare(password, user.password);

    if (!auth) {
      return res.status(400).send("Password is incorrect");
    }

    res.cookie("jwt", createToken(email, user._id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });
    return res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        image: user.image,
        profileSetup: user.profileSetup,
        color: user.color,
      },
    });
  } catch (err) {
    console.log({ err });
    return res.status(500).send("internal server error");
  }
};

export const getUserInfo = async (req, res, next) => {
  try {
    const userData = await User.findById(req.userId);

    if (!userData) {
      return res.status(404).send("Email with given email not found");
    }

    return res.status(200).json({
      id: userData._id,
      email: userData.email,
      firstname: userData.firstname,
      lastname: userData.lastname,
      image: userData.image,
      profileSetup: userData.profileSetup,
      color: userData.color,
    });
  } catch (err) {
    console.log({ err });
    return res.status(500).send("internal server error");
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { userId } = req;
    const { firstname, lastname, image, color } = req.body;

    if (!firstname || !lastname) {
      return res.status(400).send("firstname , lastname and color is required");
    }
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        firstname,
        lastname,
        image,
        color,
        profileSetup: true,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      id: userData._id,
      email: userData.email,
      firstname: userData.firstname,
      lastname: userData.lastname,
      image: userData.image,
      profileSetup: userData.profileSetup,
      color: userData.color,
    });
  } catch (err) {
    console.log({ err });
    return res.status(500).send("internal server error");
  }
};

const uploadImage = async (file) => {
  const image = file
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;
  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI, {
      quality: "auto",
      fetch_format: "auto",
      timeout:180000
  });

  return uploadResponse.url;

}

export const addProfileImage = async (req, res, next) => {

  try {
    if (!req.file) {
      return res.status(400).send("image is required");
    }

    const fileName = await uploadImage(req.file);
           

//     const date = Date.now();
//     const ext = path.extname(req.file.originalname);
//     let fileName = "uploads/profile/" + date + ext;
//     console.log(fileName)
//     console.log("File path:", req.file.path);
// console.log("New file path:", fileName);

//     renameSync(req.file.path, fileName);

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      {
        image: fileName,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      image: updatedUser.image,
    });
  } catch (err) {
    console.log({ err });
    return res.status(500).send("internal server errorss");
  }
};

export const removeProfileImage = async (req, res, next) => {
  try {
    const { userId } = req;

    const user = await User.findById(userId);

    if(!user){
        return res.status(404).send("user not found");
    }
    if(user.image){
      user.image = null;
        
    }
    
    await user.save();

    return res.status(200).send('profile image removed successfully');
  } catch (err) {
    console.log({ err });
    return res.status(500).send("internal server error");
  }
};

export const logout = async (req, res, next) => {
    try {
     res.cookie("jwt", "", {maxAge:1, secure:true, sameSite:"None"});
  
      return res.status(200).send('logout successful');
    } catch (err) {
      console.log({ err });
      return res.status(500).send("internal server error");
    }
  };
