import { Router } from "express";
import {
    gerUsers,
    getUserById,
    updatedUser,
    updatePassword,
    deleteUser
} from './user.controller.js'
import { validableJwt } from "../../middlewares/validate.jwt.js";
import { updateUserValidator } from "../../middlewares/validators.js";