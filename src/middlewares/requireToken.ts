import { ENV_VARIABLES } from "configEnv";
import { ResponseStatus } from "enum/codeStatus";
import { TokenError } from "error/Errors";
import { responseErrorStatus } from "error/ResponseErrors";
import { INextFunction, IRequest, IResponse } from "types/RequestAndResponse";
import { verifyToken } from "utils/jwt";

export function requireToken(req: IRequest, res: IResponse, next: INextFunction){
        
    try {
        const token = req.headers.x_access_token;
        const TOKEN_SECRET = ENV_VARIABLES.SECRET_KEY

        if(!token) throw new TokenError("Token not provided")
        if(Array.isArray(token)) throw new TokenError("Token must be a string")
    
        const decode = verifyToken(token, TOKEN_SECRET, 'SECRET_KEY')
        
        if(typeof decode === 'string') throw new TokenError('token type mustnt be a string') 
        if(!decode.id && !decode.username) throw new TokenError('id or username are empty')
        
        req.data = {
            id: decode.id, 
            username: decode.username
        }
        
        next()

    } catch (error) {
    
        if(error instanceof Error){
            const {message, statusCode} = responseErrorStatus(error)
            return res.status(statusCode).json({
                status: ResponseStatus.FAILED,
                msg: message
            })
        }

        return res.status(500).json({
            status: ResponseStatus.FAILED,
            msg: 'ay papa, ni yo se'
        })
            
    }

    
}