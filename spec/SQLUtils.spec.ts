import {SQLUtils} from '../src/SQLUtils';
import {SQLBoolean} from '../src/SQLBoolean';

describe('SQLUtils', () => {
    describe('SQLUtils.toDatetime', () => {
        it('SQLUtils.toDatetime', () => {
            let date = new Date('2020-07-16T17:30:53.824Z');
            expect(SQLUtils.toDatetime(date)).toBe('2020-07-16 17:30:53.824');
        });
        
        it('< 100 ms date', () => {
            let date = new Date('2020-07-16T17:30:53.024Z');
            expect(SQLUtils.toDatetime(date)).toBe('2020-07-16 17:30:53.024');
        });
    
        it('< 10 ms date', () => {
            let date = new Date('2020-07-16T17:30:53.004Z');
            expect(SQLUtils.toDatetime(date)).toBe('2020-07-16 17:30:53.004');
        });
    
        it('Leading 0s for months', () => {
            let date = new Date('2020-07-16T17:30:53.004Z');
            expect(SQLUtils.toDatetime(date)).toBe('2020-07-16 17:30:53.004');
        });
    
        it('Leading 0s for days', () => {
            let date = new Date('2020-07-06T17:30:53.004Z');
            expect(SQLUtils.toDatetime(date)).toBe('2020-07-06 17:30:53.004');
        });
    
        it('Leading 0s for hours', () => {
            let date = new Date('2020-07-06T07:30:53.004Z');
            expect(SQLUtils.toDatetime(date)).toBe('2020-07-06 07:30:53.004');
        });
    
        it('Leading 0s for minutes', () => {
            let date = new Date('2020-07-06T17:03:53.004Z');
            expect(SQLUtils.toDatetime(date)).toBe('2020-07-06 17:03:53.004');
        });
    
        it('Leading 0s for seconds', () => {
            let date = new Date('2020-07-06T17:30:03.004Z');
            expect(SQLUtils.toDatetime(date)).toBe('2020-07-06 17:30:03.004');
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
                expect(SQLUtils.castToBoolean(k)).toBe(isTrue);
            });
        }

        it('arbitrary strings simply return itself', () => {
            expect(SQLUtils.castToBoolean(("asdfadsf" as any))).toBe("asdfadsf");
        });

        it('null should be preserved', () => {
            expect(SQLUtils.castToBoolean(null)).toBe(null);
        });

        it('undefined should return null', () => {
            expect(SQLUtils.castToBoolean(undefined)).toBe(null);
        });

        it('numbers other than 0 or 1 simply return itself', () => {
            expect(SQLUtils.castToBoolean((-123 as any))).toBe(-123);
            expect(SQLUtils.castToBoolean((123 as any))).toBe(123);
        });
    });

    describe('toValue', () => {
        it('null', () => {
            expect(SQLUtils.toValue(null)).toBe('NULL');
        });

        it('undefined', () => {
            expect(SQLUtils.toValue(undefined)).toBe('NULL');
        });

        it('number', () => {
            expect(SQLUtils.toValue(123.45)).toBe('123.45');
        });

        it('false', () => {
            expect(SQLUtils.toValue(false)).toBe('0');
        });

        it('true', () => {
            expect(SQLUtils.toValue(true)).toBe('1');
        });

        it('string', () => {
            expect(SQLUtils.toValue("test")).toBe('"test"');
        });

        it('string with double quotes', () => {
            expect(SQLUtils.toValue("\"test\"")).toBe('"\\"test\\""');
        });

        it('Date', () => {
            expect(SQLUtils.toValue(new Date(0))).toBe('"1970-01-01 00:00:00.000"');
        });
    });
});
