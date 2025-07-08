import mongoose from "mongoose";
import dayjs from "dayjs";

import { DateDto } from "dto/DateDto/DateDto";
import { PatientSearchParams } from "dto/SearchParams/PatientSearchParams";
import { MonthName } from "types/MonthName";
import { OptionsAgreggationQuery } from "types/IQueryParams";



export class PatientAggregationQuery {
    private indexName: string
    private params:  PatientSearchParams
    private userId: string
    private optionsQuery: OptionsAgreggationQuery

    constructor(indexName: string, params: PatientSearchParams, userid: string, optionsQuery: OptionsAgreggationQuery){
        this.indexName = indexName
        this.params = params
        this.userId = userid
        this.optionsQuery = optionsQuery
    }

    public getAggregationQuery(){
        
        const query: unknown[] = [] 
        const searchQuery = this.obtain$SearchQuery()
        const matchQuery = this.obtain$MatchQuery()
        
        if(matchQuery) query.unshift(matchQuery)

        if(searchQuery) query.unshift(searchQuery)
        if(!query.length) return null

        if(!matchQuery) query.push({ $match: {
            userId: new mongoose.Types.ObjectId(this.userId)
        }})

        query.push(this.obtain$facetStage())
            
        return query
    }

    private obtain$facetStage(){
        return {
            $facet: {
                'patients': this.obtain$OptionsStage(),
                'count': this.obtain$CountStage()
            }
        }
    }

    private obtain$OptionsStage(){
        return [
            { $limit : 5 },
            { $skip: this.optionsQuery.skip },
            { $sort: {beginningDate: -1, _id: 1}  }
        ]
    }

    private obtain$CountStage(){
        return [{ $count: "total" }]
        
    }

    private obtain$MatchQuery(){
        const queryParamsFirstAnd: unknown[] = []
        const queryParamsSecondAnd: unknown[] = []
        const queryParamsOr: unknown[] = []

        const {month} = this.params


        if(month) queryParamsSecondAnd.push(this.getParamMonth(month as MonthName))

        queryParamsSecondAnd.push({
            userId: new mongoose.Types.ObjectId(this.userId)
        })

        if(queryParamsSecondAnd.length <= 1 && !queryParamsOr.length) return null

        if(queryParamsOr.length) queryParamsFirstAnd.push({ $or: queryParamsOr })
        if(queryParamsSecondAnd.length > 1) queryParamsFirstAnd.push(...queryParamsSecondAnd)

        return { $match: {$and: queryParamsFirstAnd} }
    }

    private obtain$SearchQuery(){
        const queryMust: unknown[] = []
        const queryParamsAnd: unknown[] = []
        const queryParamsOr: unknown[] = []

        const {name, ci, sex, beginningDate, age} = this.params

        if(name) queryParamsAnd.push(this.getParamName(name))
        
        if(ci) queryParamsOr.push(this.getParamCi(ci))

        if(age) queryParamsOr.push(...this.getParamAge(age))

        if(sex) queryParamsAnd.push(this.getParamSex(sex))

        if(beginningDate) queryParamsAnd.push(this.getBeginningDate(beginningDate))

        if(!queryParamsAnd.length && !queryParamsOr.length) return null

        if(queryParamsAnd.length) queryMust.push(...queryParamsAnd)
        if(queryParamsOr.length) queryMust.push({
                compound: {
                    should: queryParamsOr
                }
            })


        return {
            $search: {
                index: this.indexName,
                compound: {
                    must: queryMust
                }
            }
        }
    }

    private getParamName(name: string){
        return {
            regex: {
                query: `.*${name}.*`,
                path: ['name'],
            },   
        }
    }

    private getBeginningDate(date: string){
        const minRangeDate = new Date(new DateDto(date).convertToDBFormat())

        const maxRangeDate = dayjs(minRangeDate).add(1, 'day').format()
        
        return {
            range: {
                path: "beginningDate",
                gte: new Date(minRangeDate), 
                lt: new Date(maxRangeDate)
            }
        }
    }

    private getParamAge(age: number | number[]){

        if(Array.isArray(age)) return age.map(el => ({
                    equals:{
                        value: el,
                        path: 'age'
                    }
                })
            )

        return [{ 
            equals:{
                value: age,
                path: 'age'
            }
        }]

    }

    private getParamCi(ci: string | string[]){
        let query
        if(!Array.isArray(ci)) query = `${ci}.*`
        else query = ci.map(el => `${el}.*`) 
            
            
        return {
            regex: {
                query,
                path: 'ci',
                allowAnalyzedField: true
            },   
        }
    }

    private getParamMonth(month: MonthName){
        const dateQuery = new DateDto(DateDto.convertToMonthToDate(month)).convertToDBFormat()

        return { 
            $expr: {  
                $eq: [ { $month: "$beginningDate" }, new Date(dateQuery).getMonth() + 1 ]
            }
        }
        
    }

     private getParamSex(sex: string){
        return {
            text: {
                query: `${sex}`,
                path: ['sex']
            },   
        }
    }

}

