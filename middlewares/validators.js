import { body } from "express-validator";
import { existEmail, existUsername, notRequiredField } from "../utils.js/db.validators";
import { validateErrors, validateErrorsWhitoutFiles } from "./validate.error";

export const registerValidator= [
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('surname','Surname cannot be empty')
        .notEmpty(),
    body('username', 'Username cannot be empty')
    .notEmpty()
    .toLowerCase(),
    body('email', 'Email cannot be empty')
        .notEmpty()
        .custom(existUsername),
    body('username')
    .notEmpty()
    .toLowerCase()
    .custom(existEmail),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('Password must be strong')
        .isLength({min:8})
        .withMessage('Password need min 8 chacarcters'),
    body('phone', 'Phone cannot be empty')
        .notEmpty()
        .isMobilePhone(),
        validateErrors
]

export const updateUserValidator = [
    body('username')
        .optional()
        .notEmpty()
        .toLowerCase()
        .custom((username, { req })=> existUsername(username, req.user)),
    body('email')
        .optional()
        .notEmpty()
        .isEmail()
        .custom((email, {req})=> existEmail(email, req.user)),
    body('password')
        .optional()
        .custom(notRequiredField),
    body('profilePicture')
        .optional()
        .custom(notRequiredField),
    body('role')
        .optional()
        .custom(notRequiredField),
        validateErrorsWhitoutFiles
]