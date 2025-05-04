import { Router } from "express";
import {addHotel,getHotel,getHotelById,updateHotel,deleteHotel, hotelStatsCreator} from './hotel.controller.js'
import { validateJwt } from "../../middlewares/validate.jwt.js";

const api = Router()

api.post('/add',[validateJwt], addHotel)
api.get('/', [validateJwt], getHotel)
api.get('/:id', [validateJwt], getHotelById)
api.put('/:id', [validateJwt], updateHotel)
api.delete('/:id',[validateJwt], deleteHotel)
api.post('/hotel-stats',[validateJwt],hotelStatsCreator)

export default api