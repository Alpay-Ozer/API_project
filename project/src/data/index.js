const knex = require('knex'); 
const { getLogger } = require('../core/logging'); 
const {join} = require('path');


const config = require('config');

const NODE_ENV = config.get('env');
const isDevelopment = NODE_ENV === 'development';

const DATABASE_CLIENT = config.get('database.client');
const DATABASE_NAME = config.get('database.name');
const DATABASE_HOST = config.get('database.host');
const DATABASE_PORT = config.get('database.port');
const DATABASE_USERNAME = config.get('database.username');
const DATABASE_PASSWORD = config.get('database.password');

let knexInstance;

const initializeData = async() => {
    const logger = getLogger(); 
    logger.info('Initializing connection to the database'); 

  const knexOptions = {
    client: DATABASE_CLIENT,
    connection: {
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      //database: DATABASE_NAME,
      user: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
      insecureAuth: isDevelopment,
    },
    migrations: {
      tableName: 'knex_meta',
      directory: join('src', 'data', 'migrations'),
    },
    seeds: {
      directory: join('src', 'data', 'seeds'),
    },
  };

  knexInstance=knex(knexOptions);

  try{
    await knexInstance.raw("SELECT 1+1 AS RESULT");
    await knexInstance.raw(`CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME}`);
    await knexInstance.destroy();
    knexOptions.connection.database = DATABASE_NAME;
    knexInstance = knex(knexOptions);
    await knexInstance.raw("SELECT 1+1 AS RESULT");
  }catch(error){
    logger.error("Error initializing database", {error});
    throw new Error("Error initializing database");
  }

  try{
    await knexInstance.migrate.latest();
  }catch (error) {
    logger.error('Migrations failed', {error});
    throw new Error('Migrations failed');
  }

  if(isDevelopment){
    try{
      await knexInstance.seed.run();
    } catch(error){
      logger.error('Seeding failed', {error});
    }
  }
  
  return knexInstance;
}

const getKnex = () => {
    if(!knexInstance){
        throw new Error("initialize database first");
    }
    return knexInstance;
}

const tables = Object.freeze({
    boek: "boeken",
    auteur: "auteurs"
});


module.exports= {initializeData, getKnex, tables};