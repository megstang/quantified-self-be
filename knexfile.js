// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/snacktrack',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'postgres',
    connection: 'postgres://xqbmfdbvjsxttx:8f05f35fe078146e5db06da5f759e61c577192fbe8ffa50e38463a187de4edb2@ec2-23-23-184-76.compute-1.amazonaws.com:5432/d7ab679ieh2qso',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    }
  }

};
