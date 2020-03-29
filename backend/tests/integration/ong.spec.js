import request from 'supertest';

import app from '../../src/app';

import connection from '../../src/database/connection';

describe('ONG', () => {
    // Antes de cada teste executar a migration
    beforeEach(async () => {
        //Limpar a base de dados antes de executar os testes
        await connection.migrate.rollback()
        await connection.migrate.latest()
    });


    // Encerrar a conexão com a base para não ficar aberta após os testes:

    afterAll(async () => {
        await connection.destroy();
    });

    // Executar apos executar todoas as migrations
    it('should be able to create a new ONG', async () => {
        const response = await request(app).post('/ongs').send({
            name: "Teste",
            email: "teste@teste.com",
            whatsapp: "4700000000",
            city: "Timbó",
            uf: "SC"
        });
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).not.toBeNull();
    });


});