const chai = require('chai'); //require chai library
const should = chai.should(); //call should so we can use shoulda woulda matchers like capybara
const server = require('../index'); // go out and reach into server file itself
const chaiHttp = require('chai-http'); //implement requests on server that we have locallyconst server = require('../server'); // go out and reach into server file itself

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('Meal Routes', () => {
  before((done) => {
  database.migrate.latest()
    .then(() => done())
    .catch(error => {
      throw error;
    });
  });

  beforeEach((done) => {
    database.seed.run()
      .then(() => done())
      .catch(error => {
        throw error;
      });
  });

  after((done) => {
  database.seed.run()
    .then(() => done())
    .catch(error => {
      throw error;
    });
  });

  describe('GET /api/v1/meals', () => {
    it('get api/v1/meals should return meal names and foods', done => {
      chai.request(server)
      .get('/api/v1/meals')
      .end((err, response) => {
        response.should.have.status(200);
        response.body.rows.should.be.a('array');
        response.body.rows[0].should.have.property('id')
        response.body.rows[0].should.have.property('name')
        response.body.rows[0].should.have.property('foods')
        response.body.rows[0].name.should.equal('Breakfast');
        response.body.rows[0].foods[0].name.should.equal('bagel');
        response.body.rows[0].foods[0].calories.should.equal(250);
        response.body.rows[0].foods[0].food.should.equal(1);
      });
      done();
    });
  });

  describe('GET /api/v1/meals/id/foods', () => {
    it ('gets /api/v1/meals/:id/foods should return foods associated with meal by meal id', done => {
      chai.request(server)
      .get('/api/v1/meals/1/foods')
      .end((err,response) => {
        response.should.have.status(200);
        response.body.should.be.a('array');
        response.body[0].should.have.property('food');
        response.body[0].should.have.property('name');
        response.body[0].should.have.property('calories');
        response.body[0].name.should.equal('bagel');
        response.body[0].calories.should.equal(250);
        response.body[0].food.should.equal(1);
      });
      done();
    });
  });


  describe('GET /api/v1/meals/id/foods sad', () => {
    it ('gets /api/v1/meals/:id/foods should return error if no meal associated with id', done => {
      chai.request(server)
      .get('/api/v1/meals/5/foods')
      .end((err,response) => {
        response.should.have.status(404);
      });
      done();
    });
  });

});
