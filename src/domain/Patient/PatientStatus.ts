import { PatientError } from "Errors/Errors";
import { validateExist } from "utils/validateExist";
import { validateLength } from "utils/validateLength";
import { validateType } from "utils/validateType";


export class PatientStatus {
    constructor(public value: string){
        validateExist(this.value, 'status', PatientError)
        validateType(this.value, 'string', 'status', PatientError)
        validateLength(this.value, 2, 30, 'status', PatientError)
    }
}