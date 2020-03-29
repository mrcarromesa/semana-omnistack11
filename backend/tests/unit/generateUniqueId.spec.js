import generateUniqueId from '../../src/utils/generateUniqueId';

describe('Generete Unique ID', () => {
    // o it aqui significa isto.
    it('should generate a unique ID', () => {
        // o expect espera que alguma coisa aconteça
        //expect(2 + 2).toBe(5);
        const id = generateUniqueId();

        expect(id).toHaveLength(8);
    })
});