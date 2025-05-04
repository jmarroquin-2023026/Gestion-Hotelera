import { Router } from "express";
import{addEvent,getEvent,getEventById,updateEvent,deleteEvent, calculateDisponibility} from './events.controller.js'
import { validateJwt } from "../../middlewares/validate.jwt.js";

const api = Router()

api.post('/add',[validateJwt], addEvent)
api.get('/', [validateJwt], getEvent)
api.get('/:id', [validateJwt], getEventById)
api.put('/:id', [validateJwt], updateEvent)
api.delete('/:id',[validateJwt], deleteEvent)
api.post('/calculate-disponibility',[validateJwt],calculateDisponibility)

export default api