import { ErrorSign } from "types/ErrorSign"


export function validateDateFromNow(instance: string, name: string, typeError: ErrorSign = Error){
    if(new Date(instance) > new Date()) throw new typeError('date cant be a future time')
}