import { body } from "express-validator";

export const userValidation = [
  body("email").isEmail().trim().withMessage("email is required"),
  body("password").isLength({ min: 6 }).trim().withMessage("password is required"),
  body("username").isLength({ min: 1 }).trim().withMessage("username is required"),
  body("phonenumber").isLength({min:10}).withMessage("invalid value")
];

export const loginValidation = [
  body("email").isEmail().trim().withMessage("email is required"),
];

   