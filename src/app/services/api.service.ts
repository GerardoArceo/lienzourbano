import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FunctionsService } from './functions.service';
import { User } from '../models/user.model';
import { isDevMode } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  URL_API: string;
  URL_JAVA_API: string;
  public user: User;
  private itemsCollection: AngularFirestoreCollection<any>;
  public chats = [];

  constructor(private http: HttpClient,
              private functions: FunctionsService,
              public afAuth: AngularFireAuth,
              private afs: AngularFirestore) {

    this.URL_API = 'https://lienzourbano.herokuapp.com/';
    if (isDevMode()) {
      this.URL_API = 'https://lienzourbano.herokuapp.com/';
    }
  }

  async executeAction(accion: string, params?: {}) {
    const u = this.functions.getUser();
    let token = null;
    if (u) {
      token = u.getToken();
    }
    const data = { token, accion, params };
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const result = await this.http.post(this.URL_API + 'api', JSON.stringify(data), {headers}).toPromise();
    if (result && typeof result[0].text !== 'undefined') {
      this.functions.toastAlert2(result[0]);
    }
  }

  async executeQuery(accion: string, params?: {}) {
    const u = this.functions.getUser();
    let token = null;
    if (u) {
      token = u.getToken();
    }
    const data = { token, accion, params };
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const result = await this.http.post(this.URL_API + 'api', JSON.stringify(data), {headers}).toPromise();
    if (result && result[0].ok === true) {
      return result[1];
    }
    return [];
  }

  async googleRegister() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.afAuth.authState.subscribe(async (user) => {
      if (!user || !user.uid) {
        return;
      }
      const data = {name: user.displayName, email: user.email, pass: user.uid, address: '', contact: '', photo: user.photoURL};
      await this.executeAction('addUser', data);
      await this.login(user.email, user.uid);
    });
  }

  async googleLogin() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.afAuth.authState.subscribe(async user => {
      if (!user || !user.uid) {
        return;
      }
      await this.login(user.email, user.uid);
    });
  }

  async login(email: string, pass: string) {
    const data = { email, pass };
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const result = (await this.http.post(this.URL_API + 'login', JSON.stringify(data), {headers}).toPromise());
    if (result) {
      const json = result[1];
      if (result[0].ok) {
        this.user = new User(json);
        this.functions.saveSession(this.user);
      }

      if (typeof result[0].text !== 'undefined') {
        this.functions.toastAlert2(result[0]);
      }
    }
  }

  cargarMensajes(user1, user2) {
    this.itemsCollection = this.afs.collection<any>('chats', ref => ref.orderBy('date', 'desc'));
    return this.itemsCollection.valueChanges()
    .pipe(map((mensajes) => {
      this.chats = [];
      for (const mensaje of mensajes) {
        if (mensaje.idSender === user1.id) {
          mensaje.name = user1.name;
        } else {
          mensaje.name = user2.name;
        }
        const d = new Date(mensaje.date);
        mensaje.date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        mensaje.date += ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        this.chats.unshift(mensaje);
      }
      return this.chats;
    }));
  }

  agregarMensaje(message: string, idReceiver) {
    const u = this.functions.getUser();
    const mensaje = {
      idSender: u.id,
      idReceiver,
      message,
      date: new Date().getTime(),
    };
    return this.itemsCollection.add(mensaje);
  }

  updateAuction(idAuction, prize) {
    const data = {
      idAuction,
      prize,
      date: new Date().getTime()
    };
    return this.itemsCollection.add(data);
  }

  subscribeAuction() {
    this.itemsCollection = this.afs.collection<any>('auctions', ref => ref.orderBy('date', 'desc'));
    return this.itemsCollection.valueChanges()
    .pipe(map((data) => {
      return data[0];
    }));
  }

  logout() {
    this.user = null;
    this.afAuth.auth.signOut();
  }
}
