
import { UserError } from "Errors/Errors";
import { validateExist } from "utils/validateExist";
import { validateLength } from "utils/validateLength";
import { validateType } from "utils/validateType";
import { validateWhiteSpaces } from "utils/validateWhiteSpaces";

export class UserPassword {
    constructor(public value: string){
        validateExist(this.value, 'password', UserError)
        validateType(this.value, 'string', 'password', UserError)
        validateWhiteSpaces(this.value, 'password', UserError)
        validateLength(this.value, 6, 100, 'password', UserError)
    }
}