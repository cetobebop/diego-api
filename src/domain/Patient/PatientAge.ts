import { PatientError } from "error/Errors";
import { validateExist } from "utils/validateExist";
import { validateNumberRange } from "utils/validateNumberRange";
import { validateType } from "utils/validateType";

export class PatientAge {

    constructor(public value: number){
        validateExist(this.value, 'age', PatientError)
        validateType(this.value, 'number', 'age', PatientError)
        validateNumberRange(this.value, 0, 115, 'age', PatientError)
    }

}