import { Router } from "express";
import { addReview,getReview,getReviewById,updateReview,deleteReview } from "./review.controller.js";
import { isAdmin, isClient, validateJwt } from "../../middlewares/validate.jwt.js"

const api = Router()

api.post('/add',[validateJwt,isClient], addReview)
api.get('/', [validateJwt,isAdmin], getReview)
api.get('/:id', [validateJwt,isAdmin], getReviewById)
api.put('/:id', [validateJwt,isAdmin], updateReview)
api.delete('/:id',[validateJwt,isAdmin], deleteReview)

export default api