import AWS from "aws-sdk";
import { environment } from '../common/environment';

export class Dynamo {

    initDB(): Promise<any> {
        return new Promise((resolver, reject) => {
            try {
               
                AWS.config.update(environment.database);
                let dynamodb = new AWS.DynamoDB();

                var params = {};
                dynamodb.listTables(params, function (err, data) {
                    if(err) console.log(err, err.stack);
                    else {
                        console.log(data);

                        var tables = data.TableNames;
                        if(tables.includes(tableParams.TableName)) console.log(`database ${tableParams.TableName} alredy exist`);
                        else
                        {
                            dynamodb.createTable(tableParams, function(err, data) {
                                if (err) console.log(err, err.stack);
                                else console.log(data);
                            });
                        }
                    }   
                });

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

const tableParams = {
    TableName: "Movies",
    KeySchema: [
        { AttributeName: "year", KeyType: "HASH" },
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