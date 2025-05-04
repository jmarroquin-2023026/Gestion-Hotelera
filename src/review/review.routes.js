import { Router } from "express";
import { addReview,getReview,getReviewById,updateReview,deleteReview } from "./review.controller.js";
import { validateJwt } from "../../middlewares/validate.jwt.js"

const api = Router()

api.post('/add',[validateJwt], addReview)
api.get('/', [validateJwt], getReview)
api.get('/:id', [validateJwt], getReviewById)
api.put('/:id', [validateJwt], updateReview)
api.delete('/:id',[validateJwt], deleteReview)

export default api