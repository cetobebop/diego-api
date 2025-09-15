import { PatientSearchParamsError } from "error/Errors"
import { ageFormatRegex } from "regex/ageFormatRegex"
import { ciFormatRegex } from "regex/ciFormatRegex"
import { dateToMatch } from "regex/dateToMatch"
import { monthToMach } from "regex/monthToMach"
import { nameFormatRegex } from "regex/nameFormatRegex"
import { removeExtraWhitespace } from "regex/removeExtraWhitespace"
import { sexToMatch } from "regex/sexToMatch"
import { validateExist } from "utils/validateExist"
import { validateLength } from "utils/validateLength"
import { validateType } from "utils/validateType"




export class PatientSearchParams {

    name?: string
    ci?: string[] | string
    age?: number[] | number
    sex?: string 
    beginningDate?: string
    status?: string
    month?: string

    constructor(inputText: string){

        this.validateText(inputText)
        const sanitized = this.sanitizeText(inputText)
        const object = this.createParamsObject(sanitized)
        
        this.ci = object.ci
        this.age = object.age
        this.beginningDate = object.beginningDate
        this.month = object.month
        this.name = object.name
        this.sex = object.sex
        // this.status = object.status
    }

    private sanitizeText(inputText: string){
        return inputText.replace(removeExtraWhitespace, ' ').trim().toLowerCase()
    }

    private validateText(text: string){
        validateExist(text, 'inputText', PatientSearchParamsError)
        validateType(text, 'string', 'textInput', PatientSearchParamsError)
        validateLength(text, 0, 300, 'textinput', PatientSearchParamsError)
    }

    private createParamsObject(text: string){

        const age = this.obtainAge(text)
        const ci = this.obtainCI(text)
        const beginningDate = this.obtainBeginningDate(text)
        const sex = this.obtainSex(text)
        text = this.removeSex(text)
        const month = this.obtainRelativeMonth(text)
        text = this.removeMonth(text)
        const name = this.obtainName(text)
        
        
        return {
            age,
            ci,
            beginningDate,
            sex,
            name, 
            month
        }
      
    }

    private obtainName(text: string){
        const nameMatches = text.match(nameFormatRegex)
        if(!nameMatches) return undefined
        return nameMatches[0]
    }

    private obtainCI(text: string){
        const ciMatches  = [...text.matchAll(ciFormatRegex)].map(e => parseInt(e[0].trim()))
        // console.log(ciMatches)
        if(!ciMatches.length) return undefined

        if(ciMatches.length === 1) return !isNaN(ciMatches[0]) ? ciMatches[0].toString() :  undefined

        const [firstCI, secondCI] = ciMatches 

        if(isNaN(firstCI) || isNaN(secondCI)) return undefined

        return [firstCI.toString(), secondCI.toString()]
    }

    private obtainAge(text: string){
        const ageMatches = [...text.matchAll(ageFormatRegex)].map(e => parseInt(e[0].trim()))
        if(!ageMatches.length) return undefined
        
        if(ageMatches.length === 1) return !isNaN(ageMatches[0]) ? ageMatches[0] : undefined

        const [firstAge, secondAge] = ageMatches

        if(isNaN(firstAge) || isNaN(secondAge)) return undefined

        return [firstAge, secondAge]
    }

    private obtainBeginningDate(text: string){
        const dateMatches = text.match(dateToMatch)
        if(!dateMatches) return undefined
        return dateMatches[0]
    }

    private obtainSex(text: string){
        const sexMatches = text.match(sexToMatch)
        if(!sexMatches) return undefined
        return sexMatches[0]
    }

    private removeSex(text: string){
        return text.replace(sexToMatch, '')
    }

    private obtainRelativeMonth(text: string){
        const monthMatch = text.match(monthToMach)
        if(!monthMatch) return undefined
        return monthMatch[0]
    }

    private removeMonth(text: string){
        return text.replace(monthToMach, '').replace(/!/g, '')
    }
    
}