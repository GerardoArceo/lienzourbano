import { ApiService } from 'src/app/services/api.service';
import { FunctionsService } from 'src/app/services/functions.service';

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

    public api: ApiService;
    public functions: FunctionsService;

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

    async getComments(idArtwork: string) {
        return (await this.api.executeQuery('getComments', {idArtwork}))[0];
    }

    async addComment(comment: string, idArtwork: string) {
        await this.api.executeAction('addComment', {idArtwork, comment});
    }

    async addFavoriteArtwork(idArtwork: string) {
        await this.api.executeAction('addFavoriteArtwork', {idArtwork});
    }

    async addFollower(idArtist: string) {
        await this.api.executeAction('addFollower', {idArtist });
    }

    async addAuction(initialPrize, duration, idArtwork) {
        if (initialPrize < 0) {
          this.functions.toastAlert2({title: 'ERROR', text: 'Precio inválido', type: 'error'});
          return;
        }
        if (duration < 0) {
          this.functions.toastAlert2({title: 'ERROR', text: 'Duración inválida', type: 'error'});
          return;
        }
        const postingDate = this.functions.getTimestamp();
        const x = new Date(postingDate);
        const y = new Date(x.getTime() + duration * 1000 * 60 * 60);
        const closeDate = y.toISOString().split('T')[0] + ' ' + y.toLocaleTimeString();
        await this.api.executeAction('addAuction', {idArtwork, initialPrize, postingDate, closeDate});
    }

    updateAuction(i, prize, idAuction) {
        this.api.executeAction('updateAuction', {idAuction, prize});
        this.api.updateAuction(idAuction, prize);
    }

    register(name, email, pass, address, contact) {
        this.api.executeAction('addUser', {name, email, pass, address, contact, photo: ''});
    }
}
