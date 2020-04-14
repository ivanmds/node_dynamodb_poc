import { Server } from './configurations/server';
import { Dynamo } from './configurations/dynamo';
import { CostExplorer } from 'aws-sdk';

const server = new Server();
const dynamo = new Dynamo();

server.bootstrap()
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