import Hotel from './hotel.model.js'
import Report from '../report/report.model.js'
export const addHotel =async(req,res)=>{
    try{
        if (!req.user || req.user.role !== 'HOTELOWNER') {
            return res.status(403).send({
                success: false,
                message: 'Only hotel owners can add new hotels.'
            })
        }
        let data=req.body
        let subject = new Hotel(data)
        await subject.save()
        return res.status(200).send(
            {
                sucess:true,
                message:'Hotel saved succesfully',
                subject
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({message:'Internal server Error',e})
    }
}

export const getHotel = async(req,res)=>{
    try{
        const{limit = 20, skip = 0} = req.query
        let hotel=await Hotel.find()
            .skip(skip)
            .limit(limit).populate({path:'rooms'})

        if(!hotel.length===0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Hotel not found'
                }
            )
        }
        hotel.sort((a,b)=> b.reservations-a.reservations)
        return res.send(
            {
                success: true,
                message:'Hotel found',
                hotel
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({success: false, message: 'General error',e})
    }
}

export const getHotelById = async(req,res)=>{
    try{
        let {id} = req.params
        let hotel = await Hotel.findById(id)

        if(!hotel) return res.status(404).send(
            {
                success: false,
                message: 'Hotel not found'
            }
        )
        return res.send(
            {
                success:true,
                message: 'Hotel found',
                hotel
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({success:false, message:'General error',e})
    }
}

export const updateHotel = async(req,res)=>{
    try{
        let {id} = req.params
        let data = req.body
        let updateHotel = await Hotel.findByIdAndUpdate(id,data,{new:true})
        if(!updateHotel){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Hotel not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Hotel updated successfully',
                updateHotel
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({success:false, message:'General error',e})
    }
}

export const deleteHotel = async(req,res)=>{
    try{
        let{id} = req.params
        let deleteHotel = await Hotel.findByIdAndDelete(id)
        if(!deleteHotel) return res.status(404).send(
            {
                success:false,
                message: 'Hotel not found'
            }
        )
        return res.send(
            {
                success:true,
                message:'Hotel deleted successfully',
                deleteHotel
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({success:false, message:'General error',e})
    }
}
export const statGenerator =async(reservs,year,month)=>{
    try {
        
        let filteredReservs = reservs.filter((reserv)=>{
            let date = new Date(reserv.entranceDate)
            return date.getFullYear()==year && date.getMonth() ==month
        })
        return filteredReservs.length
    } catch (error) {
        return error
    }
}

export const hotelStatsCreator=async(req,res)=>{
    try {
        let {hotel,year}=req.body
        const{limit = 20, skip = 0} = req.query
        let hotelExist = await Hotel.findById(hotel)
        if(!hotelExist) return res.status(404).send({success:false,message:'Hotel not found'})
        let reservs = await Report.find({hotel:hotel}).limit(limit).skip(skip)
        let monthlyStats = []
        const months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"]
        for(let i=0;i<12;i++){
            monthlyStats.push({
                month:months[i],
                reservs: await statGenerator(reservs,year,i+1)
            })
        }
        return res.send({success:true,message:monthlyStats})
    } catch (error) {
        console.log(error);
        return res.status(500).send({success:false,message:'General error creating the stats'})
    }
}