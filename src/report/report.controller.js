import Report from './report.model.js'

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
        let updateReport = await Report.findByIdAndUpdated(id,data,{new:true})
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