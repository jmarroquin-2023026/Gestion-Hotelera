import { Router } from "express";
import {addHotel,getHotel,getHotelById,updateHotel,deleteHotel, hotelStatsCreator} from './hotel.controller.js'
import { isAdmin,isNotClient,isHotelOwner, validateJwt } from "../../middlewares/validate.jwt.js";

const api = Router()

api.post('/add',[validateJwt,isHotelOwner], addHotel)
api.get('/', [validateJwt,isAdmin], getHotel)
api.get('/:id', [validateJwt, isAdmin], getHotelById)
api.put('/:id', [validateJwt, isAdmin], updateHotel)
api.delete('/:id',[validateJwt,isAdmin], deleteHotel)
api.post('/hotel-stats',[validateJwt, isNotClient],hotelStatsCreator)

export default api