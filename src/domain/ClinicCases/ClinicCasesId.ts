import { InitializationError } from "error/Errors";
import { validateExist } from "utils/validateExist";
import { validateType } from "utils/validateType";

export class ClinicCasesId {
    
    constructor(public value: string){
        validateExist(this.value, 'id', InitializationError)
        validateType(this.value, 'string', 'id', InitializationError)
    }

}