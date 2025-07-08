import { ErrorSign } from "types/ErrorSign";

export function validateLength(instance: string, min: number, max: number, name: string, typeError: ErrorSign = Error){
        if(instance.length <= min || instance.length >= max) throw new typeError(`${name} invalid length`)
}