import { Router } from "express";
import { addRoom, getRoom,getRoomById,updateRoom,deleteRoom } from "./room.controller.js";
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js"
import { roomValidator,updatedRoomValidator } from "../../middlewares/validators.js";
import { limiter } from "../../middlewares/rate.limit.js";
const api = Router()

api.post('/add',[validateJwt,isAdmin,roomValidator,limiter], addRoom)
api.get('/', [validateJwt,limiter], getRoom)
api.get('/:id', [validateJwt,limiter], getRoomById)
api.put('/:id', [validateJwt,isAdmin,updatedRoomValidator,limiter], updateRoom)
api.delete('/:id',[validateJwt,isAdmin,limiter], deleteRoom)

export default api