import dayjs from "dayjs";


export function validateDateFormat(date: string) {
    return dayjs(date, 'YYYY-MM-DD', true).isValid();
}