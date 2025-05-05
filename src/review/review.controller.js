import Review from './review.model.js'

export const addReview =async(req,res)=>{
    try{
        let data=req.body;
        let subject = new Review(data)
        await subject.save()
        return res.status(200).send(
            {
                sucess:true,
                message:'Review saved succesfully',
                subject
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({message:'Internal server Error',e})
    }
}

export const getReview = async(req,res)=>{
    try{
        const{limit = 20, skip = 0} = req.query
        let review=await Review.find()
            .skip(skip)
            .limit(limit)

        if(!review.length===0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Review not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message:'Review found',
                review
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({success: false, message: 'General error',e})
    }
}

export const getReviewById = async(req,res)=>{
    try{
        let {id} = req.params
        let review = await Review.findById(id)

        if(!review) return res.status(404).send(
            {
                success: false,
                message: 'Review not found'
            }
        )
        return res.send(
            {
                success:true,
                message: 'Review found',
                review
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({success:false, message:'General error',e})
    }
}

export const updateReview = async(req,res)=>{
    try{
        let {id} = req.params
        let data = req.body
        let updateReview = await Review.findByIdAndUpdate(id,data,{new:true})
        if(!updateReview){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Review not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Review updated successfully',
                updateReview
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({success:false, message:'General error',e})
    }
}

export const deleteReview = async(req,res)=>{
    try{
        let{id} = req.params
        let deleteReview = await Review.findByIdAndDelete(id)
        if(!deleteReview) return res.status(404).send(
            {
                success:false,
                message: 'Review not found'
            }
        )
        return res.send(
            {
                success:true,
                message:'Review deleted successfully',
                deleteReview
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({success:false, message:'General error',e})
    }
}