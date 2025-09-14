import { cloudinaryUpload } from "@config/CloudinaryConfig";
import { ObjectAnyProperties } from "types/ObjectAnyProperties";
import { IObjectStorageFacade } from "types/ObjectStorageFacade";


export class ObjectStorageFacade implements IObjectStorageFacade{

    private ObjectStorage = cloudinaryUpload

    async sendFile(urlFile: string, options?: ObjectAnyProperties): Promise<{ url: string; }> {
    
        const upload = await this.ObjectStorage.uploader.upload(urlFile, 
        { resource_type: "image" })


        return {url: upload.secure_url}

    }

   
}