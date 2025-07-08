import dayjs, { Dayjs } from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import 'dayjs/locale/es'
import { MonthName } from "types/MonthName"

dayjs.extend(customParseFormat)



export class DateDto {

    private value: Dayjs 
    private domainFormat = 'DD-MM-YYYY'
    private BDFormat = 'YYYY/MM/DD'

    constructor(date: string | Date){
        this.validate(date)
        date = date instanceof Date ? this.toString(date) : date
        this.value = this.validateDomainDate(date) ? dayjs(date, this.domainFormat, true) : dayjs(date, this.BDFormat, true)
    }

    private validate(date: string | Date){   
        if(typeof date === 'string') {
            if(!this.validateAnyFormatDate(date) && !this.validateDomainDate(date)) throw Error('invalid dateDto format')
        }
        else if(!(date instanceof Date)) throw Error('invalid DateDto value, must be a string or Date')
    }

    private toString(date: Date){
        return dayjs(date).format(this.BDFormat)
    }

    private validateAnyFormatDate(date: string){
        return dayjs(date).isValid()
    }

    private validateDomainDate(date: string){
        return dayjs(date, this.domainFormat, true).isValid()
    }

    public convertToDBFormat(){
        return this.value.format(this.BDFormat)
    }

    public convertToDomainFormat(){
        return this.value.format(this.domainFormat)
    }

    public static convertToMonthToDate(month: MonthName){
        const selectMonth = {
            enero: 1,
            febrero: 2,
            marzo: 3,
            abril: 4,
            mayo: 5,
            junio: 6,
            julio: 7,
            agosto: 8,
            septiembre: 9,
            octubre: 10,
            noviembre: 11,
            diciembre: 12,
            Enero: 1,
            Febrero: 2,
            Marzo: 3,
            Abril: 4,
            Mayo: 5,
            Junio: 6,
            Julio: 7,
            Agosto: 8,
            Septiembre: 9,
            Octubre: 10,
            Noviembre: 11,
            Diciembre: 12
        };
        return new Date(`2000-${selectMonth[month]}-10`)
    }

}