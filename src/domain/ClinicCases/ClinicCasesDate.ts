import { InitializationError } from "Errors/Errors"
// import { dateFormatRegex } from "regex/DateFormatRegex"
import { validateDate } from "utils/validateDate"
import { validateExist } from "utils/validateExist"
import { validateType } from "utils/validateType"

export class ClinicCasesDate {

    constructor(public value: string){
            validateExist(this.value, 'date', InitializationError)
            validateType(this.value, 'string', 'date', InitializationError)
            validateDate(this.value, 'date', InitializationError)
          
        }
    
    
        // private separateDate(value: string){
        //     return value.match(dateFormatRegex)
        // }


}