import Event from './events.model.js'

export const calculateDisponibility = async(req,res)=>{
    try {
        let {consultDate,room}=req.body
        const{limit = 20, skip = 0} = req.query
        consultDate = new Date(consultDate)
        let events = await Event.findOne({date:consultDate,room:room})
        if(!events) return res.send({success:true,message:'Room aviable'})
        return res.send({success:false,message:'Room not aviable'})
    } catch (error) {
        console.log(error);
        return res.status(500).send({success:false,message:'General errro calculating the disponibility'})
    }
}

export const addEvent =async(req,res)=>{
    try{
        let data=req.body;
        let subject = new Event(data)
        await subject.save()
        return res.status(200).send(
            {
                sucess:true,
                message:'Event saved succesfully',
                subject
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({message:'Internal server Error',e})
    }
}

export const getEvent = async(req,res)=>{
    try{
        const{limit = 20, skip = 0} = req.query
        let events=await Event.find()
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
                events
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
        let updateEvent = await Event.findByIdAndUpdate(id,data,{new:true})
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