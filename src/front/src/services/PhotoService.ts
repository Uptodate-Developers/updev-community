import axios from "./Axios";
import { StatusCodes } from "../../api/models";
import { FileResponse, PhotoResponse } from "../../api/responses";
import { plainToClass } from "class-transformer";

export class PhotoService {
  async uploadUserPorfilePic(file: File): Promise<FileResponse | string> {
    const uploaderURL = import.meta.env.VITE_UPLOADER_URL;
    const formData = new FormData();
    formData.set("file", file);

    const uplaodResult = await axios.post(`${uploaderURL}/upload`, formData);

    if (
      uplaodResult.status == StatusCodes.Success ||
      uplaodResult.status == StatusCodes.Created
    )
      return plainToClass(FileResponse, uplaodResult.data);

    return `errror:Une erreur est survenue, message:${uplaodResult.data}, status:${uplaodResult.status}`;
  }

  async uploadPostPic(fileInfo: any): Promise<PhotoResponse | string> {
    const uploaderURL = import.meta.env.VITE_UPLOADER_URL;

    let formData = new FormData();
    formData.set("file", fileInfo.originFileObj);
    formData.set("folder", "posts");

    const { data: urlResponse } = await axios.post(
      `${uploaderURL}/upload`,
      formData
    );

    if (urlResponse) {
      const uplaodResult = await axios.post("/posts/photo", {
        url: urlResponse.url
      });

      if (
        uplaodResult.status == StatusCodes.Success ||
        uplaodResult.status == StatusCodes.Created
      )
        return plainToClass(PhotoResponse, uplaodResult.data);
    }

    return "errror:Une erreur est survenue";
  }
}
