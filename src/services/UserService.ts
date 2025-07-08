import { User } from "domain/User/User";
import { IUserService, UserRepository } from "types/User";


export class UserService implements IUserService {

    constructor(private repository: UserRepository){}

    createUser(user: User): Promise<User> {
        return this.repository.create(user)
    }

    deleteUser(id: string): Promise<Boolean | null> {
        return this.repository.delete(id)
    }

    getAllUser(): Promise<User[]> {
        return this.repository.getAll()
    }

    getUserById(id: string): Promise<User | null> {
        return this.repository.getById(id)
    }


    updateUser(id: string, user: User): Promise<User | null> {
        return this.repository.update(id, user)
    }

    getUserByUsername(username: string): Promise<User | null> {
        return this.repository.findUserByUsername(username)
    }

}