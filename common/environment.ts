export const environment = {
    server: { port: process.env.SERVER_PORT || 3000 },
    database: { 
        region: process.env.DYNAMODB_REGION || "local",
        endpoint: process.env.DYNAMODB_ENDPOINT || "http://localhost:8000",
        accessKeyId: process.env.ACCESS_KEY_ID || "root",
        secretAccessKey: process.env.SECRET_ACCESS_KEY || "secret",
        tablename: 'Movies'
     }
}