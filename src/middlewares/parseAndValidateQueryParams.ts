import { QueryParamsDto } from "dto/QueryParamsDto/QueryParamsDto";
import { ResponseStatus } from "enum/codeStatus";
import { responseErrorStatus } from "Errors/ResponseErrors";
import { INextFunction, IRequest, IResponse } from "types/RequestAndResponse";
import { removeUndefinedProperties } from "utils/removeUndefinedProperties";

export function parseAndValidateQueryParams(req: IRequest, res: IResponse, next: INextFunction){
    try {
    
        // console.log(req.query)
        const query = removeUndefinedProperties(req.query)

        const queryParams = QueryParamsDto.create(query)

        req.queryParams = queryParams

        next()

    } catch (error) {
        const {message, statusCode} = responseErrorStatus(error)
        return res.status(statusCode).json({
            status: ResponseStatus.FAILED,
            msg: message
        })
    }
}