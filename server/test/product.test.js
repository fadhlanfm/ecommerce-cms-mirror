const app = require('../app');
const response = require('supertest');
const { Product } = require('../models');
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTkxMjE3MzQ2fQ.ALIgmxZb8YbtAbF6x-Xs425Zg_F2qlRIZ1_xTvj2j6c'; // role = 'Admin'
let fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTkxMjE3NjY2fQ.HnJpcDmXufFoKYYR-775gpvX9QjTnQvg-pHsDHtsM8Q'; // role = 'User'

beforeAll(() => {
    Product.create({
        id: 100,
        name: 'Mobil',
        image_url: 'gambar_mobil.img',
        price: 500000000,
        stock: 10
    })
    Product.create({
        id: 101,
        name: 'Mobil',
        image_url: 'gambar_mobil.img',
        price: 250000000,
        stock: 11
    })
});
afterAll(done => {
    Product.destroy({ where: {} })
        .then(() => {
            done();
        }).catch(err => {
            done(err);
        })
});

describe('Product`s CRUD using admin`s account (role = `Admin`)', () => {
    describe('Success:', () => {
        describe('Create a product', () => {
            it('Should return 201 and JSON: name, image_url, price, stock', (done) => {
                let input = {
                    name: 'Mobil',
                    image_url: 'gambar_mobil_keren.img',
                    price: 150000000,
                    stock: 10
                }
                response(app)
                    .post('/products')
                    .set('token', token)
                    .send(input)
                    .then(response => {
                        const { body, status } = response;
                        expect(status).toBe(201);
                        expect(body).toHaveProperty('name', input.name);
                        expect(body).toHaveProperty('image_url', input.image_url);
                        expect(body).toHaveProperty('price', input.price);
                        expect(body).toHaveProperty('stock', input.stock);
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
        });
        describe('Read all products', () => {
            it('Should return 200 and JSON of array of all products', (done) => {
                response(app)
                    .get('/products')
                    .set('token', token)
                    .then(response => {
                        const { body, status } = response;
                        expect(status).toBe(200);
                        expect(Array.isArray(['body'])).toBe(true);
                        expect(body[0]).toHaveProperty('createdAt');
                        expect(body[0]).toHaveProperty('updatedAt');
                        expect(body[0]).toHaveProperty('name');
                        expect(body[0]).toHaveProperty('image_url');
                        expect(body[0]).toHaveProperty('price');
                        expect(body[0]).toHaveProperty('stock');
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
        });
        describe('Update a product', () => {
            it('Should return 200 and JSON of edited product', (done) => {
                let input = {
                    name: 'Mobil sport',
                    image_url: 'gambar_mobil_edited.img',
                    price: 150000,
                    stock: 19
                }
                response(app)
                    .put('/products/100')
                    .set('token', token)
                    .send(input)
                    .then(response => {
                        const { body, status } = response;
                        expect(status).toBe(200);
                        expect(body).toHaveProperty('name', input.name);
                        expect(body).toHaveProperty('image_url', input.image_url);
                        expect(body).toHaveProperty('price', input.price);
                        expect(body).toHaveProperty('stock', input.stock);
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
        });
        describe('Delete a product', () => {
            it('Should return 200 and success message', (done) => {
                response(app)
                    .delete('/products/100')
                    .set('token', token)
                    .then(response => {
                        const { body, status } = response;
                        expect(status).toBe(200);
                        expect(body).toHaveProperty('msg', 'Your data has been deleted');
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
        });
    });

    describe('Failed', () => {
        describe('Failed to create a product', () => {
            it('Should return 400 and some failed messages', (done) => {
                let input = {
                    name: '',
                    image_url: '',
                    price: -1,
                    stock: -100
                }
                let output = ['Name cannot be empty',
                    'Price must be greater than 0', 'Stock must be greater than 0'
                ];
                response(app)
                    .post('/products')
                    .set('token', token)
                    .send(input)
                    .then(response => {
                        const { body, status } = response;
                        expect(status).toBe(400);
                        expect(body).toHaveProperty('msg');
                        expect(Array.isArray(['body'])).toBe(true);
                        expect(body.msg).toEqual(expect.arrayContaining(output));
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
            it('Should return 400 and some failed messages', (done) => {
                let input = {
                    name: 'Mobil',
                    image_url: 'gambar_mobil.img',
                    price: 'string',
                    stock: 'string'
                }
                let output = ['Price must be a number', 'Stock must be a number'];
                response(app)
                    .post('/products')
                    .set('token', token)
                    .send(input)
                    .then(response => {
                        const { body, status } = response;
                        expect(status).toBe(400);
                        expect(body).toHaveProperty('msg');
                        expect(Array.isArray(['body'])).toBe(true);
                        expect(body.msg).toEqual(expect.arrayContaining(output));
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
            it('Should return 403 and some failed messages', (done) => {
                let input = {
                    name: 'Mobil',
                    image_url: 'gambar_mobil.img',
                    price: 10000000,
                    stock: 10
                }
                response(app)
                    .post('/products')
                    .send(input)
                    .set('token', fakeToken)
                    .then(response => {
                        const { body, status } = response;
                        expect(status).toBe(403);
                        expect(body).toHaveProperty('msg', 'You are forbidden to do that');
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
            it('Should return 401 and some failed messages', (done) => {
                let input = {
                    name: 'Mobil',
                    image_url: 'gambar_mobil.img',
                    price: 10000000,
                    stock: 10
                }
                response(app)
                    .post('/products')
                    .send(input)
                    .then(response => {
                        const { body, status } = response;
                        expect(status).toBe(401);
                        expect(body).toHaveProperty('msg', 'You have to login first');
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
        });
        describe('Failed to read data', () => {
            it('Should return 403 and some failed messages', (done) => {
                response(app)
                    .get('/products')
                    .set('token', fakeToken)
                    .then(response => {
                        const { body, status } = response;
                        expect(status).toBe(403);
                        expect(body).toHaveProperty('msg', 'You are forbidden to do that');
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
            it('Should return 401 and some failed messages', (done) => {
                let input = {
                    name: 'Mobil',
                    image_url: 'gambar_mobil.img',
                    price: 10000000,
                    stock: 10
                }
                response(app)
                    .post('/products')
                    .send(input)
                    .then(response => {
                        const { body, status } = response;
                        expect(status).toBe(401);
                        expect(body).toHaveProperty('msg', 'You have to login first');
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
        });
        describe('Failed to update data', () => {
            it('Should return 400 and some failed messages', (done) => {
                let input = {
                    name: '',
                    image_url: 'gambar.img',
                    price: -1,
                    stock: -20
                }
                let output = ['Name cannot be empty',
                    'Price must be greater than 0', 'Stock must be greater than 0'
                ];
                response(app)
                    .put('/products/101')
                    .set('token', token)
                    .send(input)
                    .then(response => {
                        const { body, status } = response;
                        expect(status).toBe(400);
                        expect(body).toHaveProperty('msg');
                        expect(Array.isArray(['body'])).toBe(true);
                        expect(body.msg).toEqual(expect.arrayContaining(output));
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
            it('Should return 403 and some failed messages', (done) => {
                let input = {
                    name: 'Mobil',
                    image_url: 'gambar_mobil.img',
                    price: 10000000,
                    stock: 10
                }
                response(app)
                    .put('/products/101')
                    .send(input)
                    .set('token', fakeToken)
                    .then(response => {
                        const { body, status } = response;
                        expect(status).toBe(403);
                        expect(body).toHaveProperty('msg', 'You are forbidden to do that');
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
            it('Should return 404 and some failed messages', (done) => {
                let input = {
                    name: 'Mobil',
                    image_url: 'gambar_mobil.img',
                    price: 10000000,
                    stock: 10
                }
                response(app)
                    .put('/products/1010')
                    .send(input)
                    .set('token', token)
                    .then(response => {
                        const { body, status } = response;
                        expect(status).toBe(404);
                        expect(body).toHaveProperty('msg', 'Error Not Found');
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
            it('Should return 401 and some failed messages', (done) => {
                let input = {
                    name: 'Mobil',
                    image_url: 'gambar_mobil.img',
                    price: 10000000,
                    stock: 10
                }
                response(app)
                    .post('/products')
                    .send(input)
                    .then(response => {
                        const { body, status } = response;
                        expect(status).toBe(401);
                        expect(body).toHaveProperty('msg', 'You have to login first');
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
        });
        describe('Failed to delete data', () => {
            it('Should return 404 and some failed messages', (done) => {
                response(app)
                    .delete('/products/1010')
                    .set('token', token)
                    .then(response => {
                        const { body, status } = response;
                        expect(status).toBe(404);
                        expect(body).toHaveProperty('msg', 'Error Not Found');
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
            it('Should return 403 and some failed messages', (done) => {
                response(app)
                    .delete('/products/101')
                    .set('token', fakeToken)
                    .then(response => {
                        const { body, status } = response;
                        expect(status).toBe(403);
                        expect(body).toHaveProperty('msg', 'You are forbidden to do that');
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
            it('Should return 401 and some failed messages', (done) => {
                let input = {
                    name: 'Mobil',
                    image_url: 'gambar_mobil.img',
                    price: 10000000,
                    stock: 10
                }
                response(app)
                    .post('/products')
                    .send(input)
                    .then(response => {
                        const { body, status } = response;
                        expect(status).toBe(401);
                        expect(body).toHaveProperty('msg', 'You have to login first');
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
        });
    });
});