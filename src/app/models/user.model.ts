export class User {

    constructor(private token: string,
                public id: number = null,
                public name: string = null,
                public lastName: string = null,
                public email: string = null,
                public pass: string = null,
                public address: string = null,
                public contactNumber: string = null,
                public birthdate: string = null,
                public access: number = null) {
    }

    getToken(): string {
        return this.token;
    }

    update() {

    }

    addFavorite() {

    }

    addFollow() {

    }

}
