import * as aws from 'aws-sdk';
import { environment } from '../common/environment';

export class Dynamo {

    initDB(): Promise<any> {
        return new Promise((resolver, reject) => {
            try {
                aws.config.update(environment.database);
                let dynamodb = new aws.DynamoDB();

                var listTables = dynamodb.listTables();

                
                resolver();
            } catch (error) {
                reject(error);
            }
        });
    }

    bootstrap(): Promise<any> {
        return this.initDB().then(() => this);
    }
}

const params = {
    TableName : "Movies",
    KeySchema: [       
        { AttributeName: "year", KeyType: "HASH"},
        { AttributeName: "title", KeyType: "RANGE" }
    ],
    AttributeDefinitions: [       
        { AttributeName: "year", AttributeType: "N" },
        { AttributeName: "title", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
}