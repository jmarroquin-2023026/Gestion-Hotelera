
import { Router } from "express";
import {addReport,getReport,getReportById,deleteReport, calculateDisponibility, getHotelOwnerReservs, getHotelOwnerGuests} from './report.controller.js'
import { validateJwt } from "../../middlewares/validate.jwt.js"

const api = Router()

api.get('/hotel-reservs', [validateJwt], getHotelOwnerReservs)
api.get('/hotel-guests',[validateJwt],getHotelOwnerGuests)
api.get('/calculate-disponibility', [validateJwt], calculateDisponibility) 
api.post('/add', [validateJwt], addReport)
api.get('/', [validateJwt], getReport)
api.get('/get/:id', [validateJwt], getReportById)
api.delete('/delete/:id', [validateJwt], deleteReport) 



export default api