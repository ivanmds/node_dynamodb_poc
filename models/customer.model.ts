import { BaseModel } from "./base.model";

export class Customer extends BaseModel {

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
        super(document);
        this.name = name;
        this.alias = alias;
        this.document = document;
        this.motherName = motherName;
    }
}