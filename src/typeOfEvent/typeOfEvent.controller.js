import TypeOfEvent from './typeOfEvent.model.js'

export const getType = async(req,res)=>{
    try{
        const{limit = 20, skip = 0} = req.query
        let type=await TypeOfEvent.find()
            .skip(skip)
            .limit(limit)

        if(!type.length===0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Type of event not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message:'Type of event found',
                type
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({success: false, message: 'General error',e})
    }
}

export const getTypeById = async(req,res)=>{
    try{
        let {id} = req.params
        let type = await TypeOfEvent.findById(id)

        if(!type) return res.status(404).send(
            {
                success: false,
                message: 'Type of event not found'
            }
        )
        return res.send(
            {
                success:true,
                message: 'Type of event found',
                type
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({success:false, message:'General error',e})
    }
}

export const updateType = async(req,res)=>{
    try{
        let {id} = req.params
        let data = req.body
        let updateType = await TypeOfEvent.findByIdAndUpdated(id,data,{new:true})
        if(!updateType){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Type of event not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Type of event updated successfully',
                updateType
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({success:false, message:'General error',e})
    }
}

export const deleteType = async(req,res)=>{
    try{
        let{id} = req.params
        let deleteType = await TypeOfEvent.findByIdAndDelete(id)
        if(!deleteType) return res.status(404).send(
            {
                success:false,
                message: 'Type of event not found'
            }
        )
        return res.send(
            {
                success:true,
                message:'Type of event deleted successfully',
                deleteType
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({success:false, message:'General error',e})
    }
}