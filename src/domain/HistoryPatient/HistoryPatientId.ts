import { InitializationError } from "error/Errors"
import { validateExist } from "utils/validateExist"
import { validateType } from "utils/validateType"


export class HistoryPatientId {
    constructor(public value: string){
        validateExist(this.value, 'patientId', InitializationError)
        validateType(this.value, 'string', 'patientId', InitializationError)
        
    }
}