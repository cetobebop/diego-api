import { InitializationError } from "Errors/Errors";
import { validateExist } from "utils/validateExist";
import { validateIsNaN } from "utils/validateIsNaN";
import { validateType } from "utils/validateType";


export class ClinicCasesNumber {
    constructor(public value: number){
        validateExist(this.value, 'casesNumber', InitializationError)
        validateType(this.value, 'number', 'caseNumber', InitializationError)
        validateIsNaN(this.value, 'caseNumber', InitializationError)
    }
}