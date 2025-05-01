import { Router } from "express";
import {
    getHotel,
    getHotelById,
    updateHotel,
    deleteHotel
} from './hotel.controller.js'
import { validableJwt } from "../../middlewares/validate.jwt.js";