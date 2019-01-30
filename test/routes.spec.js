const chai = require('chai'); //require chai library
const should = chai.should(); //call should so we can use shoulda woulda matchers like capybara
const chaiHttp = require('chai-http'); //implement requests on server that we have locally
const server = require('../index'); // go out and reach into server file itself

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
pry = require('pryjs');

chai.use(chaiHttp);

describe('Client Routes', () => {

});

describe('API Routes', () => {
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

  it('get api/v1/foods should return id, name, calories', done => {
    chai.request(server)
    .get('/api/v1/foods')
    .end((err, response) => {
      response.should.have.status(200);
      response.should.be.html;
      response.body.should.be.a('array');
      response.body[0].should.have.property('id')
      response.body[0].should.have.property('name')
      response.body[0].should.have.property('calories')
      response.body[0].name.should.equal('bagel');
      response.body[0].calories.should.equal(250);
    });
    done();
  });

  it('get api/v1/foods should return id, name, calories', done => {
    chai.request(server)
    .get('/api/v1/foods/:id')
    .end((err, response) => {
      response.should.have.status(200);
      response.should.be.html;
      response.body.should.be.a('array');
      response.body[0].should.have.property('id')
      response.body.count.should.equal(1);
      response.body[0].should.have.property('name')
      response.body[0].should.have.property('calories')
      response.body[0].name.should.equal('bagel');
      response.body[0].calories.should.equal(250);
    });
    done();
  });
});

describe('API routes without seeds', () => {
  it('get api/v1/foods returns empty array if no foods seeded',done=>{
    chai.request(server)
    .get('/api/v1/foods') //sad path because not seeded
    .end((err,response) => {
      response.should.have.status(200);
      response.body.should.be.a('array');
      response.body[0].should.not.have.property('id')
      response.body[0].should.not.have.property('name')
      response.body[0].should.not.have.property('calories')
    });
    done();
  });
})
