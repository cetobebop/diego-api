import { UserMongoRepository } from "@services/UserMongoRepository"
import { UserService } from "@services/UserService"
import { ENV_VARIABLES } from "configEnv"
import { User } from "domain/User/User"
import { UserId } from "domain/User/UserId"
import { UserPassword } from "domain/User/UserPassword"
import { UserUsername } from "domain/User/UserUsername"
import { PartialUserDto } from "dto/PartialUserDto"
import { ResponseStatus } from "enum/codeStatus"
import { AuthError, UserError } from "Errors/Errors"
import { responseErrorStatus } from "Errors/ResponseErrors"
import { IRequest, IResponse } from "types/RequestAndResponse"
import { generateRefreshToken, generateToken } from "utils/jwt"
import { comparePassword } from "utils/validateComparePassword"

const userService = new UserService(new UserMongoRepository())

class AuthControllers {
    async register(req: IRequest, res: IResponse){
        try {
            
            const user = new User(new UserUsername(req?.body?.username), new UserPassword(req?.body?.password))

            const findUser = await userService.getUserByUsername(user.username.value)

            if(findUser) return res.status(400).json({
                status: ResponseStatus.FAILED,
                msg: 'user already exist'
            })

            const createUser = await userService.createUser(user)

            if(!createUser.id) throw Error('id not exist')

            const {token, tokenExpiresIn} = generateToken({id: createUser.id.value, username: createUser.username.value})

            const {refreshToken, refreshTokenExpiresIn} = generateRefreshToken({id: createUser.id.value, username: createUser.username.value})
            
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: !(ENV_VARIABLES.MODE === "developer"),
                expires: new Date(Date.now() + refreshTokenExpiresIn * 1000)
            })

            return res.status(200).json({
                status: ResponseStatus.SUCCESS,
                user: {
                    id: createUser.id.value,
                    username: createUser.username.value,
                },
                token:{
                    value: token,
                    expiresIn: tokenExpiresIn
                }
            })
        } catch (error) {
            const {message, statusCode} = responseErrorStatus(error)
            return res.status(statusCode).json({
                status: ResponseStatus.FAILED,
                msg: message
            })
        }

        
    }

    async login(req: IRequest, res: IResponse){

        try {
            
            const user = new User(new UserUsername(req?.body?.username), new UserPassword(req?.body?.password))

            const findUser = await userService.getUserByUsername(user.username.value)

            if(!findUser) return res.status(400).json({
                status: ResponseStatus.FAILED,
                msg: 'invalid parameters'
            })

            const passwordIsValid = await comparePassword(user.password.value, findUser.password.value, AuthError)

            if(!passwordIsValid) return res.status(401).json({
                status: ResponseStatus.FAILED,
                msg: 'invalid parameters'
            })

            if(!findUser.id) throw new Error("id not exist");
            
            const {token, tokenExpiresIn} = generateToken({id: findUser.id.value, username: findUser.username.value})

            const {refreshToken, refreshTokenExpiresIn} = generateRefreshToken({id: findUser.id.value, username: findUser.username.value})
            
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: !(ENV_VARIABLES.MODE === "developer"),
                expires: new Date(Date.now() + refreshTokenExpiresIn * 1000)
            })

            return res.status(200).json({
                status: ResponseStatus.SUCCESS,
                 user: {
                    id: findUser.id.value,
                    username: findUser.username.value,
                },
                token:{
                    value: token,
                    expiresIn: tokenExpiresIn
                }
            })

        } catch (error) {
            const {message, statusCode} = responseErrorStatus(error)
            return res.status(statusCode).json({
                status: ResponseStatus.FAILED,
                msg: message
            })
        }

    }

    refreshToken(req:IRequest, res: IResponse){

        try {
            if(!req.data) throw new Error('property data in request is empty')
                
            const partialUser = new PartialUserDto(new UserUsername(req?.data?.username), new UserId(req?.data?.id))

            if(!partialUser.id?.value || !partialUser?.username?.value) throw new UserError('id or username empty')

            const {token, tokenExpiresIn} = generateToken({id: partialUser.id.value, username: partialUser.username.value})

            return res.status(200).json({
                token: {
                    value: token,
                    expiresIn: tokenExpiresIn
                }
            })

        } catch (error) {
            const {message, statusCode} = responseErrorStatus(error)
            return res.status(statusCode).json({
                status: ResponseStatus.FAILED,
                msg: message
            })
        }

    }
}


export default new AuthControllers()