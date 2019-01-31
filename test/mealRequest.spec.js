const chai = require('chai'); //require chai library
const should = chai.should(); //call should so we can use shoulda woulda matchers like capybara
<<<<<<< HEAD
const chaiHttp = require('chai-http'); //implement requests on server that we have locally
const server = require('../index'); // go out and reach into server file itself
=======
const chaiHttp = require('chai-http'); //implement requests on server that we have locallyconst server = require('../server'); // go out and reach into server file itself
>>>>>>> bce8f16a60ed0c95201cf189d8875c94185f730d

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
  
  describe('GET /api/v1/meals', () => {
    it('get api/v1/meals should return meal names and foods', done => {
      chai.request(server)
      .get('/api/v1/meals')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.html;
        response.body.should.be.a('array');
        response.body.count.should.equal(4);
        response.body[0].should.have.property('id')
        response.body[0].should.have.property('name')
        response.body[0].should.have.property('foods')
        response.body[0].name.should.equal('Breakfast');
        response.body[0].foods.count.should.equal(3);
        response.body[0].foods[0].name.should.equal('bagel');
        response.body[0].foods[0].calories.should.equal(250);
        response.body[0].foods[0].id.should.equal(1);
      });
      done();
    });
  });
});
