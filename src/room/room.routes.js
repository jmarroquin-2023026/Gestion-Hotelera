import { Router } from "express";
import { addRoom, getRoom,getRoomById,updateRoom,deleteRoom } from "./room.controller.js";
import { validateJwt } from "../../middlewares/validate.jwt.js"

const api = Router()

api.post('/add',[validateJwt], addRoom)
api.get('/', [validateJwt], getRoom)
api.get('/:id', [validateJwt], getRoomById)
api.put('/:id', [validateJwt], updateRoom)
api.delete('/:id',[validateJwt], deleteRoom)

export default api