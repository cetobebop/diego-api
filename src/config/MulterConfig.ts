import multer from 'multer'

import { InitializationError } from 'error/Errors'
import { IRequest } from 'types/RequestAndResponse'

type File = {
    fieldname: string	
    originalname: string	
    encoding: string	
    mimetype: string		
    size: number	
    destination : string	
    filename: string
    path: string
    buffer: Buffer
}


function fileFilter (req: IRequest, file: File, cb: multer.FileFilterCallback) {

  if(!file.mimetype?.includes('pdf')) cb(new InitializationError('Invalid format file'))
    
  cb(null, true)


}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/public')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.pdf')
  }
})

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1 * 1024 * 1024,
        fields: 10,
        fieldSize: 20 * 1024,
        parts: 10
    },
})

 