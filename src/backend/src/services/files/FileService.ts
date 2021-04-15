import {Service} from "@tsed/di"
import Axios from "axios"
import * as Fs from "fs"
import * as Path from "path"
import { appConfig } from "../../config/app"
import * as moveFile from "move-file"
import * as fs from "fs";

@Service()
export class FileService{
    async downloadImage(url:string,downloadFolder:string, fileName:string):Promise<string>
    {
        const fullLocalPath = this.getFullLocalPath(downloadFolder, fileName)

        const fileDownloadResponse = await Axios.get(url,{responseType: "stream", method:"GET"})


        const writer = Fs.createWriteStream(fullLocalPath)
        fileDownloadResponse.data.pipe(writer)

        return this.getFilePublicUrl(fullLocalPath);
    }

    async moveLocalFile(fileUrl:string,fileName:string,destinationFolder:string):Promise<string>
    {
        const fullLocalPath = this.getFullLocalPath(destinationFolder, fileName)

        await moveFile(fileUrl,fullLocalPath)

        return this.getFilePublicUrl(fullLocalPath)
    }

    async saveFile(fileBuffer:Buffer,fileName:string,destinationFolder:string)
    {
        const fullLocalPath = this.getFullLocalPath(destinationFolder, fileName)

        fs.writeFile(fullLocalPath, fileBuffer.toString(), function(err) {
            if (err) throw err
        })

        return this.getFilePublicUrl(fullLocalPath)
    }

    getFilePublicUrl(fullLocalPath: string) {
        const filePath = fullLocalPath.replace(appConfig.appPublicPath, appConfig.appUrl)
        return filePath.replace(/\\/g, "/")
    }

    private getFullLocalPath(destinationFolder: string, fileName: string) {
        const folderPath = Path.resolve(appConfig.appPublicPath, destinationFolder)
        if (!Fs.existsSync(folderPath))
            Fs.mkdir(folderPath, {recursive: true}, (err) => {
                if (err) throw err
            })

        const fullLocalPath = Path.resolve(folderPath, fileName)
        return fullLocalPath;
    }

}