import { Repository } from "./Repository"
import { User } from "domain/User/User"



export type UserRepository = Repository<User> & {
    findUserByUsername(username: string): Promise<User | null>
}

export type IUserService = {

    createUser(user: User): Promise<User>
    deleteUser(id: string): Promise<Boolean | null>
    updateUser(id: string, user: Partial<User>): Promise<User | null>
    getAllUser(): Promise<User[]>
    getUserById(id: string): Promise<User | null>
    getUserByUsername(username: string): Promise<User | null>
    
}