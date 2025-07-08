import { UserModel } from "@models/User";
import { User } from "domain/User/User";
import { UserId } from "domain/User/UserId";
import { UserPassword } from "domain/User/UserPassword";
import { UserUsername } from "domain/User/UserUsername";
import { UserErrorStatus } from "enum/codeStatus";
import { UserError } from "Errors/Errors";

import {UserRepository} from "types/User";



export class UserMongoRepository implements UserRepository{
    async create(user: User): Promise<User> {
    
        const newUser = await new UserModel({username: user.username.value, password: user.password.value}).save()
        return new User(
            new UserUsername(newUser.username),
            new UserPassword(newUser.password),
            new UserId(newUser._id.toString())
        )
    }

    async findUserByUsername(username: string): Promise<User | null> {
        const userFind = await UserModel.findOne({username})
        if(!userFind) return null

        return new User(
            new UserUsername(userFind.username),
            new UserPassword(userFind.password),
            new UserId(userFind._id.toString())
        )
    }

    async getAll(): Promise<User[]> {

        return (await UserModel.find()).map((user)=> new User(new UserUsername(user.username), new UserPassword(user.password)))
    }

    async update(id: string, user: User): Promise<User | null> {
        
        const updatedUser = await UserModel.findByIdAndUpdate(id, {username: user.username.value}, {new: true})
        
        if(!updatedUser) throw Error(UserErrorStatus.NOT_FOUND)

        return new User(
            new UserUsername(updatedUser.username),
            new UserPassword(updatedUser.password)
        )
    }

    async delete(id: string): Promise<boolean | null> {
        const deletedUser = await UserModel.findByIdAndDelete(id)

        if(!deletedUser) throw new UserError(UserErrorStatus.NOT_FOUND)

        return Boolean(deletedUser)
    }

    async getById(id: string): Promise<User | null> {
        const userFound = await UserModel.findById(id)

        if(!userFound) throw new UserError(UserErrorStatus.NOT_FOUND)
        
        return new User(new UserUsername(userFound.username), new UserPassword(userFound.password))
    }
}