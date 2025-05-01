import { Router } from "express";
import {
    getCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
} from './category.controller.js'

import { validableJwt } from "../../middlewares/validate.jwt.js";