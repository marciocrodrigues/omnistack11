const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => { 
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    })

    it('should be abe to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({ 
                name: 'APAD2',
                email: 'teste@teste.com.br',
                whatsapp: '14996365289',
                city: 'Tupã',
                uf: 'SP'
             });
        
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
})