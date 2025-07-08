import { ErrorSign } from "types/ErrorSign";

export function validateTypeArr(instance: unknown, types: string[], name: string, typeError: ErrorSign = Error) {
    if(!types.includes((typeof instance))) throw new typeError(`${name} invalid type`)
}

     
