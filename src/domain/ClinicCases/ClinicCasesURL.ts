import { InitializationError } from "Errors/Errors";
import { validateExist } from "utils/validateExist";
import { validateLength } from "utils/validateLength";
import { validateType } from "utils/validateType";


export class ClinicCasesURL {

    constructor(public value: string){
        validateExist(this.value, 'url', InitializationError)
        validateType(this.value, 'string', 'url', InitializationError)
        validateLength(this.value, 5, 200, 'url', InitializationError)
    }
}
