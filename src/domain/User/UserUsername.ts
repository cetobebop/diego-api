import { validateType } from "utils/validateType"
import { validateLength } from "utils/validateLength"
import { UserError } from "error/Errors"
import { validateExist } from "utils/validateExist"
import { validateWhiteSpaces } from "utils/validateWhiteSpaces"

export class UserUsername {

    constructor(public value: string){
        validateExist(this.value, 'username', UserError)
        validateType(this.value, 'string', 'username', UserError)
        validateWhiteSpaces(this.value, 'username', UserError)
        validateLength(this.value, 4, 12, 'username', UserError)
    }

}