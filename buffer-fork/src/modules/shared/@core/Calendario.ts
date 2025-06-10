import { addDays, formatDate } from "date-fns";

export class Calendario {
    todayStr(format: string): string {
        return formatDate(new Date(), format);
    }
    formatDate(date: Date, format: string): string {
        return formatDate(date, format);
    }
    addDate(date: Date, increment: number): Date{
        return addDays(date, increment);
    }
}