import { ResponseStatus } from "enum/codeStatus";
import { responseErrorStatus } from "Errors/ResponseErrors";
import { INextFunction, IRequest, IResponse } from "types/RequestAndResponse";
import { upload } from "@config/MulterConfig";

import multer from "multer";

const uploadPDF = upload.single('pdf')

export function UploadSinglePDF(req: IRequest, res: IResponse, next: INextFunction) {
    uploadPDF(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ 
                status: ResponseStatus.FAILED,
                message: err.message
            });
        } else if (err) {
            const {message, statusCode} = responseErrorStatus(err)
            return res.status(statusCode).json({
                status: ResponseStatus.FAILED,
                message
            });
        }
        next();
    });
}