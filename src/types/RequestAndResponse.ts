import { QueryParamsDto } from "dto/QueryParamsDto/QueryParamsDto";
import { Request, Response, NextFunction } from "express";


export type IRequest = Request & {
    data?:{
        id: string,
        username: string
    }, 
    queryParams?: QueryParamsDto

}

export type IResponse = Response

export type INextFunction = NextFunction