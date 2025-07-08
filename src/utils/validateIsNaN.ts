import { ErrorSign } from "types/ErrorSign";


export function validateIsNaN(value: number, name: string, typeError: ErrorSign){

    if(isNaN(value)) throw new typeError(`${name} is NaN`)

}