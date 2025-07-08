import { ObjectAnyProperties } from "types/ObjectAnyProperties";



export function removeUndefinedProperties(data: ObjectAnyProperties) {
    return Object.fromEntries(Object.entries(data).filter(([k,v]) => v !== undefined))
}