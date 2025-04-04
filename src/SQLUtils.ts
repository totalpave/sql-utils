import { SQLBoolean } from './SQLBoolean';

export class SQLUtils {
    private constructor() {}

    /**
     * Returns a "drop-in" string value of x. To be used to manually craft
     * SQL queries without variable placeholder injections.
     * 
     * NOT TO BE USED BY UNTRUSTED INPUT. This method does not protect against
     * SQL injections.
     * 
     * The conversions are as follows:
     * 
     * - null/undefined becomes NULL
     * - strings becomes double-quoted strings (e.g.) 'string' becomes '"string"'
     * - Date gets formatted using {@link toDatetime} and then gets double-quoted
     * - Boolean becomes 1 for true, and 0 for false
     * - Number gets passed through as a regular string.
     * 
     * Any other types is not supported and an error will be raised.
     * 
     * @param x 
     * @returns 
     */
    public static toValue(x: number | string | Date | boolean | null | undefined): string {
        let out: string;

        if (x === null || x === undefined) {
            out = 'NULL';
        }
        else if (typeof x === 'string') {
            out = JSON.stringify(x); // Handles escaping quotations if needed.
        }
        else if (x instanceof Date) {
            out = SQLUtils.toValue(SQLUtils.toDatetime(x)); // To double quote it for drop-in
        }
        else if (typeof x === 'boolean') {
            out = x ? '1' : '0';
        }
        else if (typeof x === 'number') {
            out = x.toString();
        }
        else {
            // Should never reach here, if you do, then you aren't conforming to API signature.
            throw new Error('Unhandled type in SQLUtils.toValue');
        }

        return out;
    }

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

    /**
     * Takes an SQLBoolean (0, 1, "0", or "1") and converts it to a boolean true or boolean false value.
     * 
     * If the given value is not an SQLBoolean, then no cast is done.
     * If the given value is null/undefined, then null is returned.
     * 
     * @param value 
     * @returns 
     */
    public static castToBoolean(value: SQLBoolean | boolean): boolean {
        switch (value) {
            case 0:
            case "0":
                return false;
            case 1:
            case "1":
                return true;
            case false: return false;
            case true: return true;
            case null:
            case undefined:
                return null;
            default:
                // Should never reach here, if you do, then you aren't conforming to API signature.
                console.warn('Unexpected default case reached while casting SQLBoolean to boolean');
                return value;
        }
    }
}
