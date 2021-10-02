const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Wallet Engine ',
    description: 'The wallet system that transact create wallet, debit wallet and activate and deactive the wallet and many features',
  },
  host: 'localhost:3000/api/v1',
  basePath: "/",
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
  ],
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'header', // can be 'header', 'query' or 'cookie'
      name: 'Authorization', // name of the header, query parameter or cookie
      description: 'any description...'
    },
    bearerAuth:{
      type: 'apiKey',
      in: 'header',
      name: 'Authorization', 
      scheme: 'bearer',
      bearerFormat: 'JWT'
    }
  },
  securitySchemes:{
    bearerAuth:{      
      type: 'apiKey',
      in: 'header',
      name: 'Authorization', 
      scheme: 'bearer',
      bearerFormat: 'JWT'
    }
  },
  security:{
    bearerAuth:[]
  }
};

const outputFile = './docs/swagger-output.json';
const endpointsFiles = ['./src/app/user/routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);

