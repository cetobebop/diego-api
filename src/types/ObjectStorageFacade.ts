import { ObjectAnyProperties } from "./ObjectAnyProperties"

type ObjectStorageData = {
    url: string
}

export type IObjectStorageFacade= {
    sendFile(urlFile: string, options?: ObjectAnyProperties): Promise<ObjectStorageData>
}