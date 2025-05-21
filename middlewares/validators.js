import { body } from "express-validator";
import { existEmail, existHotel, existRoom, existUser, existUsername, isHotelOwner, notRequiredField } from "../utils.js/db.validators.js";
import { validateErrors, validateErrorsWhitoutFiles } from "./validate.error.js";

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
        .custom(existEmail),
    body('username')
    .notEmpty()
    .toLowerCase()
    .custom(existUsername),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('Password must be strong')
        .isLength({min:8})
        .withMessage('Password need min 8 chacarcters'),
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
    body('name')
        .optional().notEmpty(),
    body('surname')
        .optional().notEmpty(),
    body('profilePicture')
        .optional()
        .custom(notRequiredField),
        validateErrorsWhitoutFiles
]

export const reportValidator =[
    body('user','User is required').notEmpty().custom(existUser),
    body('hotel','Hotel is required').notEmpty().custom(existHotel),
    body('room','Room is required').notEmpty().custom(existRoom),
    body('entranceDate','Entrance Date is required').notEmpty().isDate(),
    body('exitDate','Exit Date is required').notEmpty().isDate(),
    validateErrorsWhitoutFiles
]

export const hotelValidator =[
    body('owner','User is required').notEmpty().custom(isHotelOwner),
    body('name','Name is required').notEmpty(),
    body('address','Address is required').notEmpty(),
    body('category','Category is required').notEmpty(),
    body('amenities','Amenities is required').notEmpty(),
    validateErrors
]

export const updatedHotelValidator =[
    body('owner','User is required').optional().notEmpty().custom(isHotelOwner),
    body('name','Name is required').optional().notEmpty(),
    body('address','Address is required').optional().notEmpty(),
    body('category','Category is required').optional().notEmpty(),
    body('amenities','Amenities is required').optional().notEmpty(),
    validateErrorsWhitoutFiles
]