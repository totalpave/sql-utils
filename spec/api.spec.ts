
import * as api from '../src/api';
import {SQLUtils} from '../src/SQLUtils';

describe('Public API', () => {
    it('SQLUtils', () => {
        expect(api.SQLUtils).toBe(SQLUtils);
    });
});
