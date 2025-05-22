import { initServer } from "./configs/app.js";
import { config } from "dotenv";
import { connect } from "./configs/mongo.js";
import { alreadyExistUser } from "./utils.js/defaultModels/user.models.js";
import { alreadyExistHotel } from "./utils.js/defaultModels/hotel.models.js";

const starApp=async()=>{
    config()
    await connect()
    initServer()
    await alreadyExistUser()
    await alreadyExistHotel()
}

starApp()
