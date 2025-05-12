import { SQLBoolean } from './SQLBoolean';

/**
 * Utility functions that are safe for both SQLite and MySQL.
 */
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

    /**
     * 
     * @param date 
     * @returns Converts date to string. Currently uses ISO Strings. 
     */
    public static toDatetime(date: Date): string {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }

        return date.toISOString();
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
