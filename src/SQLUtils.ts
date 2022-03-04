import { SQLBoolean } from './SQLBoolean';

export class SQLUtils {
    private constructor() {}
    public static toDatetime(date: Date): string {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }

        let month = date.getUTCMonth() + 1;
        let monthString: string = month < 10 ? `0${month}` : month.toString();

        let day = date.getUTCDate();
        let dayString: string = day < 10 ? `0${day}` : day.toString();

        let hour = date.getUTCHours();
        let hourString: string = hour < 10 ? `0${hour}` : hour.toString();

        let minute = date.getUTCMinutes();
        let minuteString: string = minute < 10 ? `0${minute}` : minute.toString();

        let second = date.getUTCSeconds();
        let secondString: string = second < 10 ? `0${second}` : second.toString();

        let ms: number = date.getUTCMilliseconds();
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

    /**
     * Takes an SQLBoolean (0, 1, "0", or "1") and converts it to a boolean true or boolean false value.
     * 
     * If the given value is not an SQLBoolean, then no cast is done.
     * If the given value is null/undefined, then null is returned.
     * 
     * @param value 
     * @returns 
     */
    public static castToBoolean(value: SQLBoolean): boolean {
        switch (value) {
            case 0:
            case "0":
                return false;
            case 1:
            case "1":
                return true;
            case null:
            case undefined:
                return null;
            default:
                // Should never reach here, if you do, then you aren't conforming to API signature.
                // eslint-disable-next-line no-console
                console.warn('Unexpected default case reached while casting SQLBoolean to boolean');
                return value;
        }
    }
}
