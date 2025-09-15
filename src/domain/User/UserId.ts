import { UserError } from "error/Errors";
import { validateExist } from "utils/validateExist";
import { validateType } from "utils/validateType";


export class UserId {
    constructor(public value: string){
        validateExist(this.value, 'id', UserError)
        validateType(this.value, 'string', 'id', UserError)
    }

}