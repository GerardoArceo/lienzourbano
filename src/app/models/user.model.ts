export class User {

    private token: string;
    public id: number;
    public name: string;
    public email: string;
    public pass: string;
    public address: string;
    public contact: string;
    public photo: string;
    public access: number;

    constructor(json) {
        this.token = json.token;
        this.id = json.id;
        this.name = json.name;
        this.email = json.email;
        this.pass = json.pass;
        this.address = json.address;
        this.contact = json.contact;
        this.photo = json.photo;
        this.access = json.access;
    }

    getToken(): string {
        return this.token;
    }

}
