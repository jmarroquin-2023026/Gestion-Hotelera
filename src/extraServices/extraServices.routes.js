import { Router } from 'express';
import {
    addExtraService,
    getExtraServices,
    getExtraServiceById,
    updateExtraService,
    deleteExtraService
} from './extraServices.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js';

const api = Router()

api.post('/add',[validateJwt,], addExtraService)
api.get('/',[validateJwt], getExtraServices)
api.get('/:id',[validateJwt], getExtraServiceById)
api.put('/:id',[validateJwt], updateExtraService)
api.delete('/:id',[validateJwt], deleteExtraService)

export default api