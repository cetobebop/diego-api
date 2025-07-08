import { UserId } from "domain/User/UserId"
import { UserUsername } from "domain/User/UserUsername"




export class PartialUserDto {

    constructor(public username?: UserUsername, public id?: UserId){}

}