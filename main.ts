import { Server } from './configurations/server';
import { Dynamo } from './configurations/dynamo';
import { customerRouter } from './apis/customer.router';
import { ElasticConfig } from './configurations/elastic';
import { SwaggerConfig } from './configurations/swagger';

const server = new Server();
const dynamo = new Dynamo();
const elastic = new ElasticConfig();
const swagger = new SwaggerConfig();

server.bootstrap([customerRouter])
    .then(server => {
        console.log(`Server is listening on: ${server.application.address}`);
    })
    .catch(error => {
        console.log('Server failed to start');
        console.error(error);
        process.exit(1);
    });

dynamo.bootstrap()
    .then(db => {
        console.log('Dynamo connected');
    })
    .catch(error => {
        console.log('Error in start dynamodb');
        console.error(error);
        process.exit(1);
    });

elastic.init()
    .then(elastic => {
        console.log('success start elastic');
    })
    .catch(error => {
        console.log('Error elastic');
        console.error(error);
        process.exit(1);
    });