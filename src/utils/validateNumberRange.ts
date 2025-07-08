import { ErrorSign } from "types/ErrorSign";

export function validateNumberRange(num: number, min: number, max: number, name: string,  typeError: ErrorSign = Error){
        if(num < min || num > max) throw new typeError(`invalid ${name} range`)
}