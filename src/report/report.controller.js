import Report from './report.model.js'
import Room from '../room/room.model.js'
import Hotel from '../hotel/hotel.model.js'
import User from '../user/user.model.js'
export const calculateDisponibility =async(req,res)=>{
    try {
        let {consultDate, room} = req.body
        const date = new Date(consultDate)
        const{limit = 20, skip = 0} = req.query
        let existRoom = await Room.findById(room)
            if(!existRoom)return res.status(404).send({success:false,message:'The room do not exist'})
        let reservs=await Report.find({room:room})
            .skip(skip)
            .limit(limit)
        if(reservs.length ===0){
            return res.send({success:true,message:existRoom.amount})
        }
        reservs =  reservs.filter((reserv)=>{
            const entrance = new Date(reserv.entranceDate)
            const exit = new Date(reserv.exitDate)
            return entrance <= date && exit > date
        })
        const disponibleRooms = existRoom.amount - reservs.length
        return res.send({success:true,message:disponibleRooms})
    } catch (error) {
        console.log(error);
        return res.status(500).send({success:false,message:'General error calculating the disponibility'})
    }
}

export const addReport =async(req,res)=>{
    try{
        let data=req.body;
        let subject = new Report(data)
        await subject.save()
        return res.status(200).send(
            {
                sucess:true,
                message:'Report saved succesfully',
                subject
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({message:'Internal server Error',e})
    }
}

export const getReport = async(req,res)=>{
    try{
        const{limit = 20, skip = 0} = req.query
        let report=await Report.find()
            .skip(skip)
            .limit(limit)

        if(!report.length===0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Report not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message:'Report found',
                report
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({success: false, message: 'General error',e})
    }
}

export const getReportById = async(req,res)=>{
    try{
        let {id} = req.params
        let report = await Report.findById(id)

        if(!report) return res.status(404).send(
            {
                success: false,
                message: 'Report not found'
            }
        )
        return res.send(
            {
                success:true,
                message: 'Report found',
                report
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({success:false, message:'General error',e})
    }
}

export const updateReport = async(req,res)=>{
    try{
        let {id} = req.params
        let data = req.body
        let updateReport = await Report.findByIdAndUpdate(id,data,{new:true})
        if(!updateReport){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Report not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Report updated successfully',
                updateReport
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({success:false, message:'General error',e})
    }
}

export const deleteReport = async(req,res)=>{
    try{
        let{id} = req.params
        let deleteReport = await Report.findByIdAndDelete(id)
        if(!deleteReport) return res.status(404).send(
            {
                success:false,
                message: 'Report not found'
            }
        )
        return res.send(
            {
                success:true,
                message:'Report deleted successfully',
                deleteReport
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({success:false, message:'General error',e})
    }
}

export const getHotelOwnerReservs = async(req,res)=>{
    try {
        let hotel = await Hotel.find({owner:req.user.uid})
        if(hotel.length === 0) return res.status(404).send({success:false,message:'Not hotels found'})
        let allReservs = []

        for(let i =0;i<hotel.length;i++){
            if(!hotel[i]) break
            let newReserv = await Report.find({hotel:hotel[i]._id.toString()})
            allReservs.push(newReserv)
        }
        return res.send({success:true,message:allReservs})
    } catch (error) {
        console.log(error);
        return res.status(500).send({success:false,message:'General errror showing the reservs'})
    }
}
export const getHotelOwnerGuests = async(req,res)=>{
    try {
        let hotel = await Hotel.find({owner:req.user.uid})
        if(hotel.length === 0) return res.status(404).send({success:false,message:'Not hotels found'})
        let allGuests = []

        for(let i =0;i<hotel.length;i++){
            if(!hotel[i]) break
            let newReserv = await Report.find({hotel:hotel[i]._id.toString()})
            for (let j=0;j<newReserv.length;j++){
                if(!newReserv[j]) break
                let user = await User.findOne({_id:newReserv[j].user.toString()})
                allGuests.push(user)
            }
        }
        return res.send({success:true,message:allGuests})
    } catch (error) {
        console.log(error);
        return res.status(500).send({success:false,message:'General errror showing the reservs'})
    }
}