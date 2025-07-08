import { QueryParamsError } from "Errors/Errors"
import { validateIsNaN } from "utils/validateIsNaN"
import { validateNumberRange } from "utils/validateNumberRange"
import { validateType } from "utils/validateType"

export class QueryParamsDtoLimit {

    value: number 

    constructor(value: number){
        validateType(value, 'number', 'limit', QueryParamsError)
        validateIsNaN(value, 'limit', QueryParamsError)
        validateNumberRange(value, 1, 50, 'limit', QueryParamsError)
        this.value = value
    }


}