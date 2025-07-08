import { PatientError } from "Errors/Errors";
import { validateExist } from "utils/validateExist";
import { validateLength } from "utils/validateLength";
import { validateType } from "utils/validateType";


export class PatientAddress {
    constructor(public value: string){
        validateExist(this.value, 'address', PatientError)
        validateType(this.value, 'string', 'address', PatientError)
        validateLength(this.value, 1, 150, 'address', PatientError)
    }
}