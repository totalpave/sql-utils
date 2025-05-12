import {SQLiteUtils} from '../src/SQLiteUtils';
import {SQLBoolean} from '../src/SQLBoolean';

describe('SQLiteUtils', () => {
    describe('SQLiteUtils.toDatetime', () => {
        it('SQLiteUtils.toDatetime', () => {
            let date = new Date('2020-07-16T17:30:53.824Z');
            expect(SQLiteUtils.toDatetime(date)).toBe('2020-07-16T17:30:53.824Z');
        });
        
        it('< 100 ms date', () => {
            let date = new Date('2020-07-16T17:30:53.024Z');
            expect(SQLiteUtils.toDatetime(date)).toBe('2020-07-16T17:30:53.024Z');
        });
    
        it('< 10 ms date', () => {
            let date = new Date('2020-07-16T17:30:53.004Z');
            expect(SQLiteUtils.toDatetime(date)).toBe('2020-07-16T17:30:53.004Z');
        });
    
        it('Leading 0s for months', () => {
            let date = new Date('2020-07-16T17:30:53.004Z');
            expect(SQLiteUtils.toDatetime(date)).toBe('2020-07-16T17:30:53.004Z');
        });
    
        it('Leading 0s for days', () => {
            let date = new Date('2020-07-06T17:30:53.004Z');
            expect(SQLiteUtils.toDatetime(date)).toBe('2020-07-06T17:30:53.004Z');
        });
    
        it('Leading 0s for hours', () => {
            let date = new Date('2020-07-06T07:30:53.004Z');
            expect(SQLiteUtils.toDatetime(date)).toBe('2020-07-06T07:30:53.004Z');
        });
    
        it('Leading 0s for minutes', () => {
            let date = new Date('2020-07-06T17:03:53.004Z');
            expect(SQLiteUtils.toDatetime(date)).toBe('2020-07-06T17:03:53.004Z');
        });
    
        it('Leading 0s for seconds', () => {
            let date = new Date('2020-07-06T17:30:03.004Z');
            expect(SQLiteUtils.toDatetime(date)).toBe('2020-07-06T17:30:03.004Z');
        });
    });
    
    describe('castToBoolean', () => {
        let expectations: Map<SQLBoolean, boolean> = new Map();
        expectations.set(0, false);
        expectations.set(1, true);
        expectations.set("0", false);
        expectations.set("1", true);

        jest.spyOn(console, 'warn').mockImplementation(() => {});

        for (let [ k, isTrue ] of expectations) {
            it(`${k} (${typeof k}) should be ${isTrue}`, () => {
                expect(SQLiteUtils.castToBoolean(k)).toBe(isTrue);
            });
        }

        it('arbitrary strings simply return itself', () => {
            expect(SQLiteUtils.castToBoolean(("asdfadsf" as any))).toBe("asdfadsf");
        });

        it('null should be preserved', () => {
            expect(SQLiteUtils.castToBoolean(null)).toBe(null);
        });

        it('undefined should return null', () => {
            expect(SQLiteUtils.castToBoolean(undefined)).toBe(null);
        });

        it('numbers other than 0 or 1 simply return itself', () => {
            expect(SQLiteUtils.castToBoolean((-123 as any))).toBe(-123);
            expect(SQLiteUtils.castToBoolean((123 as any))).toBe(123);
        });

        describe('booleans', () => {
            it('true', () => {
                expect(SQLiteUtils.castToBoolean(true)).toBe(true);
            });

            it('false', () => {
                expect(SQLiteUtils.castToBoolean(false)).toBe(false);
            });
        });
    });

    describe('toValue', () => {
        it('null', () => {
            expect(SQLiteUtils.toValue(null)).toBe('NULL');
        });

        it('undefined', () => {
            expect(SQLiteUtils.toValue(undefined)).toBe('NULL');
        });

        it('number', () => {
            expect(SQLiteUtils.toValue(123.45)).toBe('123.45');
        });

        it('false', () => {
            expect(SQLiteUtils.toValue(false)).toBe('0');
        });

        it('true', () => {
            expect(SQLiteUtils.toValue(true)).toBe('1');
        });

        it('string', () => {
            expect(SQLiteUtils.toValue("test")).toBe('"test"');
        });

        it('string with double quotes', () => {
            expect(SQLiteUtils.toValue("\"test\"")).toBe('"\\"test\\""');
        });

        it('Date', () => {
            expect(SQLiteUtils.toValue(new Date(0))).toBe('"1970-01-01T00:00:00.000Z"');
        });
    });
});
