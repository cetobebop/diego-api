
import { ENV_VARIABLES } from 'configEnv'
import jwt from 'jsonwebtoken'
import { TokenError} from 'Errors/Errors'

type UserTokenData = {
    id: string,
    username: string
}

export function generateToken(data: UserTokenData) {
    const secret = ENV_VARIABLES.SECRET_KEY
    const expiresIn = 60 * 15
    

    if(!secret) throw new TokenError('secret dont exist')

    try {
    
        const token = jwt.sign(data, secret, {expiresIn});

        return {token, tokenExpiresIn: expiresIn}
        
    } catch (error) {
        if(error instanceof TokenError)
            throw new TokenError(error.message)
        else if(typeof error === 'string')
            throw new TokenError(error)
        else if(error instanceof jwt.JsonWebTokenError)
            throw new TokenError(error.message)
        throw Error('an error with the token sign')
    }
}

export function generateRefreshToken(data: UserTokenData) {
    const refreshTokenSecret = ENV_VARIABLES.SECRET_KEY_REFRESH
    const expiresIn = 60 * 60 * 24 

    if(!refreshTokenSecret) throw new TokenError('secret dont exist')

    try {
        const refreshToken = jwt.sign(data, refreshTokenSecret, {expiresIn})

        return {refreshToken, refreshTokenExpiresIn: expiresIn}
        
    } catch (error) {
        if(error instanceof TokenError)
            throw new TokenError(error.message)
        else if(typeof error === 'string')
            throw new TokenError(error)
        else if(error instanceof jwt.JsonWebTokenError)
            throw new TokenError(error.message)
        throw Error('an error ocurred with the refresh token sign')
    }
}

export function verifyToken(token: string, secret: string | undefined, nameToken: string){
    
    if(!secret) throw Error(nameToken + ' env variable not defined')

    try {
        return jwt.verify(token, secret)
    } catch (error) {
        
        if(typeof error === 'string')
            throw new TokenError(error)
        else if(error instanceof jwt.JsonWebTokenError)
            throw new TokenError(error.message)
        else if(error instanceof jwt.TokenExpiredError)
            throw new TokenError(error.message)
        
        throw Error('an error ocurred with token verification')
    }
}