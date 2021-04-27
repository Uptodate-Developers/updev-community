import * as multer from "multer"

export function multerStorage(destinationFolder:string){
    return multer.diskStorage({
        destination:(req, file,callback) =>{
            callback(null,destinationFolder)
        },
        filename:(req,file,callback)=>{

            const extenstion = file.originalname.split(".").pop()
            const fileName = `updevcom-${Date.now()}`
            callback(null,`${fileName}.${extenstion}`)
        }
    })
}