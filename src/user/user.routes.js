import { Router } from 'express'
import { getUsers,getUserById,updatePassword,updateUser,deleteUser, changeProfilePicture} from './user.controller.js'
import { validateJwt, isAdmin } from '../../middlewares/validate.jwt.js'
import {limiter} from '../../middlewares/rate.limit.js'
import {uploadProfilePicture} from '../../middlewares/multer.upload.js'
import {deleteFileOnError} from '../../middlewares/delete.file.on.error.js'
import { updateUserValidator } from '../../middlewares/validators.js'
const api = Router()

api.put('/update-profile-picture',[validateJwt,uploadProfilePicture.single('profilePicture'),deleteFileOnError,limiter],changeProfilePicture)

//Agregar el is Admin
api.get('/', [validateJwt,isAdmin,limiter], getUsers)
api.get('/:id', [validateJwt, isAdmin,limiter], getUserById)
api.put('/pass/:id', [validateJwt], updatePassword)
api.put('/update/:id', [validateJwt,updateUserValidator], updateUser)
api.delete('/delete/:id',[validateJwt,isAdmin], deleteUser)

export default api