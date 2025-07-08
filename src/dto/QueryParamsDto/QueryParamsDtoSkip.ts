import { QueryParamsError } from "Errors/Errors"
import { validateIsNaN } from "utils/validateIsNaN"
import { validateType } from "utils/validateType"

export class QueryParamsDtoSkip {

    value: number 

    constructor(value: number){
        validateType(value, 'number', 'skip', QueryParamsError)
        validateIsNaN(value, 'skip', QueryParamsError)
        this.value = value
    }


}