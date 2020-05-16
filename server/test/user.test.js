const app = require('../app')
const request = require('supertest')
const { queryInterface, close } = require('../models/index').sequelize
const jwt = require('../helpers/token')


describe('User Router', () => {
    beforeAll(() => {
        queryInterface.bulkDelete('Users')
    })

    describe('Register a user', () => {
        describe('Success:', () => {
            test('Should return status code 201 with result of JSON with keys: id, email', function (done) {
                request(app)
                    .post('/signup')
                    .send({
                        email: 'arnold@gmail.com',
                        password: '12345'
                    })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(201)
                    .end((err, result) => {
                        if (err) {
                            return done(err)
                        } else {
                            let data = result.body
                            console.log(data)
                            expect(data).toHaveProperty('email', 'arnold@gmail.com')
                            expect(data).not.toHaveProperty('password')
                            done()
                        }
                    })
            })
        })
        
        describe('Failed:', () => {
            test('Bad requests on sign up', (done) => {
                request(app)
                    .post('/signup')
                    .send({ // data
                        email: 'admin',
                        password: '',
                    })
                    .set('Accept', 'application/json') // headers
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .end((err, result) => {
                        if (err) {
                            return done(err)
                        } else {
                            let data = result.body
                            console.log(data)
                            expect(data.messages).toEqual(expect.arrayContaining([
                                'Please enter the correct email address',
                                'Please enter your password'
                              ]))
                            done()
                        }
                    })
            })
        })
    })

    describe('A user sign in by email & password', () => {
        describe('Success:', () => {
            test('Should return status code 200 result of JSON with keys: access_token', (done) => {
                request(app)
                .post('/signin')
                .send({ // data
                    email: 'arnold@gmail.com',
                    password: '12345',
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, result) => {
                    if (err) {
                        return done(err)
                    } else {
                        let data = result.body
                        console.log(data)
                        expect(data).toHaveProperty('access_token')
                        done()
                    }
                })
            })
        })

        describe('Failed:', () => {
            test('Should return status code 400 result of Invalid email/password', (done) => {
                request(app)
                .post('/signin')
                .send({ // data
                    email: 'arnold@gmail.com',
                    password: '1234415',
                })
                .expect(400)
                .expect('Content-Type', /json/)
                .end((err, result) => {
                    if (err) {
                        return done(err)
                    } else {
                        let data = result.body
                        console.log(data)
                        expect(data.messages).toEqual(expect.arrayContaining([
                            'Invalid email/password'
                        ]))
                        done()
                    }
                })
            })
        })
    })

    afterAll(() => {
        queryInterface.bulkDelete('Users')
    })
})