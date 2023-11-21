module.exports = {
    log: {
      level: 'silly',
      disabled: false,
    },
  
    cors: { 
      origins: ['http://localhost:3000'],
      maxAge: 3 * 60 * 60,
    },

    database: {
      client: 'mysql2',
      host: 'vichogent.be',
      port: 40043,
      name: '291017ao',
      username: '291017ao',
      password: 'L6iq5DBnJyNSwxn1O9AE',
    },
  };