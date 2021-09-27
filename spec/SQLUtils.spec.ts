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

        for (let [ k, v ] of expectations) {
            it(`${k} (${typeof k}) should be ${v}`, () => {
                expect(SQLUtils.castToBoolean(k)).toBe(v);
            });
        }

        it('arbitrary strings simply return false', () => {
            expect(SQLUtils.castToBoolean(<any>"asdfadsf")).toBe(false);
        });

        it('numbers other than 0 or 1 simply return false', () => {
            expect(SQLUtils.castToBoolean(<any>-123)).toBe(false);
            expect(SQLUtils.castToBoolean(<any>123)).toBe(false);
        });
    });
});
