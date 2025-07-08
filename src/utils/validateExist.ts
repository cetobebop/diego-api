import { ErrorSign } from "types/ErrorSign"


export function validateExist(instance: unknown, name: string, typeError: ErrorSign = Error){
    const msg = `${name} is required`
    if(!instance) throw new typeError(msg)
    else if(Array.isArray(instance)) {
        if(!instance.length) throw new typeError(msg)
    } 
    else if(typeof instance === 'object'){
        if(Object.keys(instance).length) throw new typeError(msg)
    }
}