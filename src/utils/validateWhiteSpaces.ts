import { ErrorSign } from "types/ErrorSign"


export function validateWhiteSpaces(instance: string, name: string, typeError: ErrorSign = Error) {
    const regex = new RegExp(/\s/g)
    if(regex.test(instance)) throw new typeError(`${name} mustnt have whitespace`)
}