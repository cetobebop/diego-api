import { PatientError } from "error/Errors";
import { validateExist } from "utils/validateExist";
import { validateType } from "utils/validateType";


export class PatientSex {
    value: string
    
    constructor (value : string){
        validateExist(value, 'sex', PatientError)
        validateType(value, 'string', 'sex', PatientError)
        const lowerValue = this.toLowerCase(value)
        this.validateGenres(lowerValue)
        this.value = lowerValue
    }

    
    private validateGenres(value: string){
        if(value !== 'femenino' && value !== 'masculino') throw new PatientError('invalid genres')
    }

    private toLowerCase(value: string){
        return value.toLowerCase()
    }

}