import { UserId } from "./UserId";
import { UserPassword } from "./UserPassword";
import { UserUsername } from "./UserUsername";


export class User{
    id?: UserId
    username: UserUsername
    password: UserPassword

    constructor(username: UserUsername, password: UserPassword, id?: UserId){
        this.id = id
        this.username = username
        this.password = password
    }

}