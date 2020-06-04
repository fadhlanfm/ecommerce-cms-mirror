const app = require('../app');
const request = require('supertest');
const { User, sequelize } = require('../models');
const { queryInterface } = sequelize;

afterAll(done => {
    User.destroy({ where: { email: 'test@test.com' } })
        .then(() => done())
        .catch(err => done(err));
})

describe('Register for users', () => {
    describe('Success create user', () => {
        it('Should return 201 and obj (user)', (done) => {
            let input = {
                email: 'test@test.com',
                password: 'test',
                role: 'Admin'
            }
            request(app)
                .post('/users/register')
                .send(input)
                .then(result => {
                    const { body, status } = result;
                    expect(status).toBe(201);
                    expect(body).toHaveProperty('email', input.email);
                    expect(body).toHaveProperty('password');
                    expect(body.password).not.toBe(input.password);
                    expect(body).toHaveProperty('role', 'Admin');
                    done();
                }).catch(err => {
                    done(err);
                });
        });
    })
    describe('Failed to create User', () => {
        it('Should return 400 and obj (status, msg)', (done) => {
            let input = {
                email: '',
                password: '',
                role: ''
            }
            let output = ['Email cannot be empty',
                'Password cannot be empty', 'Role must be User or Admin'
            ];
            request(app)
                .post('/users/register')
                .send(input)
                .then(result => {
                    const { body, status } = result;
                    expect(status).toBe(400);
                    expect(body).toHaveProperty('status');
                    expect(body.status).toBe(400);
                    expect(body).toHaveProperty('msg');
                    expect(Array.isArray(body.msg)).toBe(true);
                    expect(body.msg).toEqual(expect.arrayContaining(output));
                    done();
                }).catch(err => {
                    done(err);
                });
        });
    })
    describe('Fail to register', () => {
        it('Should return 400 and obj (status, obj)', (done) => {
            let input = {
                email: 'test@test.com',
                password: 'test',
                role: 'Admin'
            }
            request(app)
                .post('/users/register')
                .send(input)
                .then(result => {
                    const { body, status } = result;
                    expect(status).toBe(400);
                    expect(body).toHaveProperty('status');
                    expect(body.status).toBe(400);
                    expect(body).toHaveProperty('msg', 'Email has already been registered');
                    done();
                }).catch(err => {
                    done(err);
                });
        });
    })
})