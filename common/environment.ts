export const environment = {
    server: { port: process.env.SERVER_PORT || 3000 },
    database: { 
        region: process.env.DYNAMODB_REGION || 'us-west-2',
        endpoint: process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000'
     }
}