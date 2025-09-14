import { InitializationError } from "Errors/Errors";
import { validateExist } from "utils/validateExist";
import { validateIsNaN } from "utils/validateIsNaN";
import { validateType } from "utils/validateType";


export class ClinicCasesNumber {
    constructor(public value: string){
        validateExist(this.value, 'casesNumber', InitializationError)
        validateType(this.value, 'string', 'caseNumber', InitializationError)
        validateIsNaN(parseInt(this.value), 'caseNumber', InitializationError)
    }
}