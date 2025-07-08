import { InitializationError } from "Errors/Errors";
import { validateExist } from "utils/validateExist";
import { validateType } from "utils/validateType";

export class ClinicCasesId {
    
    constructor(public value: string){
        validateExist(this.value, 'id', InitializationError)
        validateType(this.value, 'string', 'id', InitializationError)
    }

}