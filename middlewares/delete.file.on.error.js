import { unlink } from 'fs/promises'
import { join } from 'path'

export const deleteFileOnError = async(error, req, res, next)=>{
    if(req.file && req.filePath){
        const filePath = join(req.filePath, req.file.filename)
        try{
            console.log(filePath)
            await unlink(filePath)
        
        }catch(e){
            console.error('Error deleting file',e)

        }
    }
    if(!error.status ===  400 || error.errors){
        return res.status(400).send(
            {
                succes: false,
                message: 'Error registering user',
                error
            }
        )
    }
    return res.status(500).send(
        {
            succes: false,
            message: error.message
        }
    )
}