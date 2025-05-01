import Hotel from './hotel.model.js'

export const getHotel = async(req,res)=>{
    try{
        const{limit = 20, skip = 0} = req.query
        let hotel=await User.find()
            .skip(skip)
            .limit(limit)

        if(!hotel.length===0){
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
        let updateHotel = await Hotel.findByIdAndUpdated(id,data,{new:true})
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