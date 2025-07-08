import { AuthError, PatientError, QueryParamsError, TokenError, UserError } from "./Errors";

type ErrorResponse = {
    message: string,
    statusCode: number
}

export function responseErrorStatus(error: unknown): ErrorResponse {
   if(error instanceof Error){
        if(error instanceof UserError) return {statusCode: 400, message: error.message}
        else if(error instanceof PatientError) return {statusCode: 400, message: error.message}
        else if(error instanceof QueryParamsError) return {statusCode: 400, message: error.message}
        else if(error instanceof AuthError) return {statusCode: 401, message: error.message}
        else if(error instanceof TokenError) return {statusCode: 401, message: error.message}
        return {statusCode: 500, message: error.message}
   }

    return {statusCode: 500, message: 'algo loco paso, ay papa'}
            

}