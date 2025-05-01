import Event from './events.model.js'

export const getEvent = async(req,res)=>{
    try{
        const{limit = 20, skip = 0} = req.query
        let events=await User.find()
            .skip(skip)
            .limit(limit)

        if(!events.length===0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Event not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message:'Event found',
                users
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({success: false, message: 'General error',e})
    }
}

export const getEventById = async(req,res)=>{
    try{
        let {id} = req.params
        let event = await Event.findById(id)

        if(!event) return res.status(404).send(
            {
                success: false,
                message: 'Event not found'
            }
        )
        return res.send(
            {
                success:true,
                message: 'Event found',
                event
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({success:false, message:'General error',e})
    }
}

export const updateEvent = async(req,res)=>{
    try{
        let {id} = req.params
        let data = req.body
        let updateEvent = await Event.findByIdAndUpdated(id,data,{new:true})
        if(!updateEvent){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Event not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Event updated successfully',
                updateEvent
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({success:false, message:'General error',e})
    }
}

export const deleteEvent = async(req,res)=>{
    try{
        let{id} = req.params
        let deleteEvent = await Event.findByIdAndDelete(id)
        if(!deleteEvent) return res.status(404).send(
            {
                success:false,
                message: 'Event not found'
            }
        )
        return res.send(
            {
                success:true,
                message:'Event deleted successfully',
                deleteEvent
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({success:false, message:'General error',e})
    }
}