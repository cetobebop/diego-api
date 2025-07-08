import { ErrorSign } from "types/ErrorSign";

export function validateType(instance: unknown, type: string, name: string, typeError: ErrorSign = Error) {
    if(typeof instance !== type) throw new typeError(`${name} invalid type`)
}