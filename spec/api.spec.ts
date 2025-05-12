
import * as api from '../src/api';
import {SQLUtils} from '../src/SQLUtils';
import {SQLiteUtils} from '../src/SQLiteUtils';

describe('Public API', () => {
    it('SQLUtils', () => {
        expect(api.SQLUtils).toBe(SQLUtils);
    });
    it('SQLiteUtils', () => {
        expect(api.SQLiteUtils).toBe(SQLiteUtils);
    });
});
