import { ENV_VARIABLES } from "configEnv";
import { ResponseStatus } from "enum/codeStatus";
import { TokenError } from "error/Errors";
import { responseErrorStatus } from "error/ResponseErrors";
import { INextFunction, IRequest, IResponse } from "types/RequestAndResponse";
import { verifyToken } from "utils/jwt";


export function requireRefreshToken(req: IRequest, res: IResponse, next: INextFunction){
    try {
        const refreshTokenCookie = req.cookies.refreshToken;
        const REFRESH_TOKEN_SECRET = ENV_VARIABLES.SECRET_KEY_REFRESH
        
        if(!refreshTokenCookie) throw new TokenError("Token not provided")

        const decode = verifyToken(refreshTokenCookie, REFRESH_TOKEN_SECRET, 'REFRESH_TOKEN_SECRET')

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