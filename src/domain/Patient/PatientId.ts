import { PatientError } from "Errors/Errors";
import { validateType } from "utils/validateType";


export class PatientId {
    constructor(public value: string){
        validateType(this.value, 'string', 'id', PatientError)
        
    }
}