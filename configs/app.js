'use strict'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import { limiter } from '../middlewares/rate.limit.js'
import userRoutes from '../src/user/user.routes.js'
import eventsRoutes from '../src/events/event.routes.js'
import categoryRoutes from '../src/category/category.routes.js'
import hotelRoutes from '../src/hotel/hotel.routes.js'
import reportRoutes from '../src/report/report.routes.js'
import reviewRoutes from '../src/review/review.routes.js'
import roomRoutes from '../src/room/room.routes.js'
import typeOfEventRoutes from '../src/typeOfEvent/typerOfEvent.routes.js' 
import authRoutes from '../src/auth/auth.routes.js'



const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
    app.use(limiter)
}

const routes = (app)=>{
    app.use('/user',userRoutes)
    app.use('/event',eventsRoutes)
    app.use('/category',categoryRoutes)
    app.use('/hotel',hotelRoutes)
    app.use('/report',reportRoutes)
    app.use('/review',reviewRoutes)
    app.use('/room',roomRoutes)
    app.use('/typeOfEvent',typeOfEventRoutes)
    app.use('/v1',authRoutes) 
}

export const initServer = ()=>{
    const app = express()
    try{
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    }catch(e){
        console.log('Server init failed', e)
    }
}