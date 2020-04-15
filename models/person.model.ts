import { v4 as uuidv4 } from 'uuid';

export class Person {

    public id: uuidv4;

    constructor(
        name: String,
        alias: String,
        document: String,
        birthDate: Date,
        motherName: String
        ) { 
            this.id = uuidv4();
        }    
}