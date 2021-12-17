
const request = require('supertest')
const app = require('../server')


beforeAll(() =>{
    process.env.NODE_ENV === 'test';
});

describe('Perhitungan API', () =>{
    it("POST /api/testperhitungan ---> Success (200) workoutRecomendation ", () => {
        return request(app)
        .post('/api/testperhitungan')
        .set('Content-Type','application/json')
        .send({ dataUser: "60815b102a4384097dc47e53",k : 1})
        .expect(200)
        .then((res) => {
            expect(res.body.user).toEqual(expect.any(Object));
            expect(res.body.output).toEqual(expect.any(Object));
            expect(res.body.k).toEqual(expect.any(Number));
            expect(res.body.dataSimilarity).toEqual(expect.any(Array));
        })
    });

    it("POST /api/testperhitungan ---> Bad Request (400)  if user not found", () => {
        return request(app).post('/api/testperhitungan')
        .set('Content-Type','application/json')
        .send({ dataUser: "60815b102a4384097dc47e52",k : 3})
        .expect(400)
        .then((res) => {
            console.log(res.body);
            expect(res.body.message).toEqual(expect.any(String));
          })
    });

    it("POST /api/testperhitungan ---> Bad Request (400) if K <= 0", () => {
        return request(app).post('/api/testperhitungan')
        .set('Content-Type','application/json')
        .send({ dataUser: "60815b102a4384097dc47e53",k : 0})
        .expect(400)
        .then((res) => {
            console.log(res.body);
            expect(res.body.message).toEqual(expect.any(String));
          })
    });
})