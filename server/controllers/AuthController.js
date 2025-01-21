import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import pkg from "bcryptjs";
import { request } from "express";
import { renameSync, unlinkSync } from "fs";

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
        // firstname: user.firstname,
        // lastname: user.lastname,
        // image: user.image,
        profileSetup: user.profileSetup,
      },
    });
  } catch (err) {
    console.log({ err });
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

export const addProfileImage = async (req, res, next) => {

  try {
    if (!req.file) {
      return res.status(400).send("image is required");
    }

    const date = Date.now();
    let fileName = "uploads/profile/" + date + req.file.originalname;
    console.log("File path:", req.file.path);
console.log("New file path:", fileName);

    renameSync(req.file.path, fileName);

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
        unlinkSync(user.image);
    }
    user.image = null;
    await user.save();

    return res.status(200).send('profile image removed successfully');
  } catch (err) {
    console.log({ err });
    return res.status(500).send("internal server error");
  }
};
