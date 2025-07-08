import { dateFormatRegex } from "regex/DateFormatRegex"
import { ErrorSign } from "types/ErrorSign"

export function validateDate(date: string, name: string, typeError: ErrorSign = Error){
    
    
    if(!dateFormatRegex.test(date)) throw new typeError('invalid date format')

}