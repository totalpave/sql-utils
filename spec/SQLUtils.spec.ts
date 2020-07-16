import {SQLUtils} from '../src/SQLUtils';

describe('SQLUtils', () => {
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
