import { PatientError } from "error/Errors";
import { dateFormatRegex } from "regex/DateFormatRegex";
import { validateDate } from "utils/validateDate";
import { validateDateFromNow } from "utils/validateDateFromNow";
import { validateExist } from "utils/validateExist";
import { validateType } from "utils/validateType";



export class PatientDate {

    constructor(public value: string){
        validateExist(this.value, 'date', PatientError)
        validateType(this.value, 'string', 'date', PatientError)
        validateDate(this.value, 'date', PatientError)
        validateDateFromNow(this.value.split('-').reverse().join('-'),'', PatientError)
     
    }

}