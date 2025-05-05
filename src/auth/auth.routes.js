import { Router } from "express";
import { register, login } from "./auth.controller.js";
import {uploadProfilePicture} from '../../middlewares/multer.upload.js'
import { registerValidator } from "../../middlewares/validators.js";
import {deleteFileOnError} from '../../middlewares/delete.file.on.error.js'
import {limiter} from '../../middlewares/rate.limit.js'
const api = Router()
api.post('/register',[uploadProfilePicture.single('profilePicture'),registerValidator,deleteFileOnError,limiter], register)
api.post('/login', login)
export default api