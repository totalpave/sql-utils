import { SQLBoolean } from './SQLBoolean';

export class SQLUtils {
    private constructor() {}
    public static toDatetime(date: Date): string {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }

        let month = date.getMonth() + 1;
        let monthString: string = month < 10 ? `0${month}` : month.toString();

        let day = date.getDate();
        let dayString: string = day < 10 ? `0${day}` : day.toString();

        let hour = date.getHours();
        let hourString: string = hour < 10 ? `0${hour}` : hour.toString();

        let minute = date.getMinutes();
        let minuteString: string = minute < 10 ? `0${minute}` : minute.toString();

        let second = date.getSeconds();
        let secondString: string = second < 10 ? `0${second}` : second.toString();

        let ms: number = date.getMilliseconds();
        let msString: string = null;
        if (ms < 10) {
            msString = `00${ms}`;
        }
        else if (ms < 100) {
            msString = `0${ms}`;
        }
        else {
            msString = ms.toString();
        }
        
        return `${date.getFullYear()}-${monthString}-${dayString} ${hourString}:${minuteString}:${secondString}.${msString}`;
    }

    public static castToBoolean(value: SQLBoolean): boolean {
        switch (value) {
            case 0:
            case "0":
                return false;
            case 1:
            case "1":
                return true;
            default: return false;
        }
    }
}
