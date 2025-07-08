import { removeUndefinedProperties } from "utils/removeUndefinedProperties";
import { QueryParamsDtoLimit } from "./QueryParamsDtoLimit";
import { QueryParamsDtoSkip } from "./QueryParamsDtoSkip";
import { IQueryParamsRaw } from "types/IQueryParams";


export class QueryParamsDto {
    readonly limit?: QueryParamsDtoLimit = new QueryParamsDtoLimit(30)
    readonly skip?: QueryParamsDtoSkip = new QueryParamsDtoSkip(0)


    constructor(query: {limit?: QueryParamsDtoLimit, skip?: QueryParamsDtoSkip}){
      
        this.limit = query.limit
        this.skip = query.skip

    }

    public static create(query: IQueryParamsRaw){

        const limit = query.limit ? parseInt(query.limit) : undefined
        const skip = query.skip ? parseInt(query.skip) : undefined

        const limitVO = new QueryParamsDtoLimit(limit ?? 30)
        const skipVO = new QueryParamsDtoSkip(skip ?? 0)


        return new QueryParamsDto({limit: limitVO, skip: skipVO})
    }

    toPrimitive(){
        return removeUndefinedProperties({
            skip: this.skip?.value,
            limit: this.limit?.value
        })
    }

   
}