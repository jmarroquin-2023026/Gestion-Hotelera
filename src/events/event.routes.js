import { Router } from "express";
import{addEvent,getEvent,getEventById,updateEvent,deleteEvent, calculateDisponibility} from './events.controller.js'
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js";

const api = Router()

api.post('/add',[validateJwt, isAdmin], addEvent)
api.get('/', [validateJwt, isAdmin], getEvent)
api.get('/:id', [validateJwt, isAdmin], getEventById)
api.put('/:id', [validateJwt, isAdmin], updateEvent)
api.delete('/:id',[validateJwt,isAdmin], deleteEvent)
api.post('/calculate-disponibility',[validateJwt,isAdmin],calculateDisponibility)

export default api