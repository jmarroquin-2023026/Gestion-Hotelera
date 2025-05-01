import Category from './category.model.js'

export const getCategory = async(req,res)=>{
    try{
        const{limit = 20, skip = 0} = req.query
        let category=await User.find()
                .skip(skip)
                .limit(limit)
        
            if(!category.length===0){
                return res.status(404).send(
                    {
                        success: false,
                        message: 'User not found'
                    }
                )
            }
            return res.send(
                {
                    success: true,
                    message:'User found',
                    category
                }
            )
    }catch(e){
        console.error(e)
        return res.status(500).send({success:false,message:'General error',e})
    }
}

export const getCategoryById = async(req,res)=>{
    try{
        let {id} = req.params
        let category = await Category.findById(id)

        if(!category) return res.status(404).send(
            {
                success: false,
                message: 'Category not found'
            }
        )
        return res.send(
            {
                success:true,
                message: 'Category found',
                category
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({success:false, message:'General error',e})
    }
}

export const updateCategory = async(req,res)=>{
    try{
        let {id} = req.params
        let data = req.body
        let updateCategory = await Category.findByIdAndUpdated(id,data,{new:true})
        if(!updateCategory){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Category not found'
                }
            )
        }
        return res.send(--
            {
                success: true,
                message: 'Category updated successfully',
                updateCategory
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({success:false, message:'General error',e})
    }
}

export const deleteCategory = async(req,res)=>{
    try{
        let{id} = req.params
        let deleteCategory = await Category.findByIdAndDelete(id)
        if(!deleteCategory) return res.status(404).send(
            {
                success:false,
                message: 'Category not found'
            }
        )
        return res.send(
            {
                success:true,
                message:'Category deleted successfully',
                deleteCategory
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({success:false, message:'General error',e})
    }
}