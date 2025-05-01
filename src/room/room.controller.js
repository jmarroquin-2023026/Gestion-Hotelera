import Room from './room.model.js'

export const getRoom = async(req,res)=>{
    try{
        const{limit = 20, skip = 0} = req.query
        let room=await User.find()
            .skip(skip)
            .limit(limit)

        if(!room.length===0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Room not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message:'Room found',
                room
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({success: false, message: 'General error',e})
    }
}

export const getRoomById = async(req,res)=>{
    try{
        let {id} = req.params
        let room = await Room.findById(id)

        if(!room) return res.status(404).send(
            {
                success: false,
                message: 'User not found'
            }
        )
        return res.send(
            {
                success:true,
                message: 'User found',
                room
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({success:false, message:'General error',e})
    }
}

export const updateRoom = async(req,res)=>{
    try{
        let {id} = req.params
        let data = req.body
        let updateRoom = await Room.findByIdAndUpdated(id,data,{new:true})
        if(!updateRoom){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Room not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Room updated successfully',
                updateRoom
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({success:false, message:'General error',e})
    }
}

export const deleteRoom = async(req,res)=>{
    try{
        let{id} = req.params
        let deleteRoom = await Room.findByIdAndDelete(id)
        if(!deleteRoom) return res.status(404).send(
            {
                success:false,
                message: 'Room not found'
            }
        )
        return res.send(
            {
                success:true,
                message:'Room deleted successfully',
                deleteRoom
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({success:false, message:'General error',e})
    }
}