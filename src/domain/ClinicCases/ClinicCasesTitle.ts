import { InitializationError } from "error/Errors";
import { validateExist } from "utils/validateExist";
import { validateLength } from "utils/validateLength";
import { validateType } from "utils/validateType";



export class ClinicCasesTitle {

    constructor(public value: string){
        validateExist(this.value, 'title', InitializationError)
        validateType(this.value, 'string', 'title', InitializationError)
        validateLength(this.value, 3, 100, 'title', InitializationError)
    }

}