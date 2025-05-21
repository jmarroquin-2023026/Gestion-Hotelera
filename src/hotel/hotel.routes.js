import { Router } from "express";
import {addHotel,getHotel,getHotelById,updateHotel,deleteHotel, hotelStatsCreator, deleteHotelPhotos} from './hotel.controller.js'
import { isAdmin,isNotClient,isHotelOwner, validateJwt } from "../../middlewares/validate.jwt.js";
import { hotelValidator } from "../../middlewares/validators.js";
import { limiter } from "../../middlewares/rate.limit.js";
import { uploadHotelPhotos } from "../../middlewares/multer.upload.js";
import { deleteFileOnError } from "../../middlewares/delete.file.on.error.js";
import { getCurrentDir } from "../../middlewares/get.current.dir.js";
const api = Router()

api.post('/add',[validateJwt,isAdmin,uploadHotelPhotos.array('photos',5),hotelValidator,deleteFileOnError,limiter], addHotel)
api.get('/', [validateJwt,isAdmin], getHotel)
api.get('/:id', [validateJwt, isAdmin], getHotelById)
api.put('/:id', [validateJwt, isAdmin], updateHotel)
api.delete('/:id',[validateJwt,isAdmin,getCurrentDir], deleteHotel)
api.post('/hotel-stats',[validateJwt, isNotClient],hotelStatsCreator)

export default api