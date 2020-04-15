export class Customer {

    public id: String;
    public name: String;
    public alias: String;
    public document: String;
    public motherName: String;

    constructor(
        name: String,
        alias: String,
        document: String,
        motherName: String
        ) { 
            this.name = name;
            this.alias = alias;
            this.document = document;
            this.motherName = motherName;
            this.id = document;
        }    
}