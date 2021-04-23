import {Service} from "@tsed/di"
import Axios from "axios"
import * as Fs from "fs"
import * as Path from "path"
import { appConfig } from "../../config/app"

@Service()
export class FileService{

    async downloadImage(url:string,downloadFolder:string, fileName:string)
    {
        const folderPath = Path.resolve(appConfig.appPublicPath,downloadFolder);
        if(!Fs.existsSync(folderPath))
            Fs.mkdir(folderPath,{recursive : true},(err) =>  { if(err) throw err });

        const fileDownloadResponse = await Axios.get(url,{responseType: "stream", method:"GET"});

        const fullLocalPath = Path.resolve(folderPath,fileName);

        const writer = Fs.createWriteStream(fullLocalPath);
        fileDownloadResponse.data.pipe(writer);

        const filePath = fullLocalPath.replace(appConfig.appPublicPath,appConfig.appUrl);

        return filePath.replace(/\\/g,"/");
    }

}