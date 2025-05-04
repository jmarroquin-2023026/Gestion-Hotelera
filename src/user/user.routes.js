import { Router } from 'express'
import { getUsers,getUserById,updatePassword,updateUser,deleteUser, changeProfilePicture} from './user.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'
import {limiter} from '../../middlewares/rate.limit.js'
import {uploadProfilePicture} from '../../middlewares/multer.upload.js'
import {deleteFileOnError} from '../../middlewares/delete.file.on.error.js'
const api = Router()

api.put('/update-profile-picture',[validateJwt,uploadProfilePicture.single('profilePicture'),deleteFileOnError,limiter],changeProfilePicture)

//Agregar el is Admin
api.get('/', [validateJwt,limiter], getUsers)
api.get('get/:id', [validateJwt], getUserById)
api.put('/pass/:id', [validateJwt], updatePassword)
api.put('update/:id', [validateJwt], updateUser)
api.delete('delete/:id',[validateJwt], deleteUser)

export default api