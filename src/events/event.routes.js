import { Router } from "express";
import{
    getEvent,
    getEventById,
    updateEvent,
    deleteEvent
} from './events.controller.js'
import { validableJwt } from "../../middlewares/validate.jwt.js";