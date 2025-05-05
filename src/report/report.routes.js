
import { Router } from "express";
import {addReport,getReport,getReportById,deleteReport, calculateDisponibility, getHotelOwnerReservs, getHotelOwnerGuests} from './report.controller.js'
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js"

const api = Router()

api.get('/hotel-reservs', [validateJwt], getHotelOwnerReservs)
api.get('/hotel-guests',[validateJwt,isAdmin],getHotelOwnerGuests)
api.get('/calculate-disponibility', [validateJwt,isAdmin], calculateDisponibility) 
api.post('/add', [validateJwt], addReport)
api.get('/', [validateJwt, isAdmin], getReport)
api.get('/get/:id', [validateJwt, isAdmin], getReportById)
api.delete('/delete/:id', [validateJwt, isAdmin], deleteReport) 



export default api