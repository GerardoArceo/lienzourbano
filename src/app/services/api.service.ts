import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FunctionsService } from './functions.service';
import { User } from '../models/user.model';
import { isDevMode } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  URL_API: string;
  URL_JAVA_API: string;
  public user: User;

  constructor(private http: HttpClient,
              private functions: FunctionsService,
              private afs: AngularFirestore,
              public afAuth: AngularFireAuth) {

    this.URL_API = 'https://piase.mx:3000/';
    if (isDevMode()) {
      this.URL_API = 'http://localhost:3000/';
    }
  }

  async executeAction(accion: string, params?: {}) {
    const s = this.functions.getSession();
    let token = null;
    if (s) {
      token = s.getToken();
    }
    const data = { token, accion, params };
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const result = await this.http.post(this.URL_API + 'api', JSON.stringify(data), {headers}).toPromise();
    if (result && typeof result[0].text !== 'undefined') {
      this.functions.toastAlert2(result[0]);
    }
  }

  async executeQuery(accion: string, params?: {}) {
    const s = this.functions.getSession();
    let token = null;
    if (s) {
      token = s.getToken();
    }
    const data = { token, accion, params };
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const result = await this.http.post(this.URL_API + 'api', JSON.stringify(data), {headers}).toPromise();
    if (result && result[0].ok === true) {
      return result[1];
    }
    return null;
  }

  googleLogin() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.afAuth.authState.subscribe(user => {
      console.log(user);
      if (!user || !user.uid) {
        return;
      }
      this.user = new User(name);
      this.user.name = user.displayName;
      this.user.email = user.email;
      this.user.pass = user.uid;
      this.functions.saveSession(this.user);
    });
  }

  async login(email: string, pass: string) {
    const data = { email, pass };
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const result = (await this.http.post(this.URL_API + 'login', JSON.stringify(data), {headers}).toPromise());
    console.log(result);
    if (result) {
      const json = result[1];
      if (json) {
        this.user = new User(json.token);
        this.user.name = json.name;
        this.user.email = json.email;
        this.user.pass = json.pass;
        this.user.id = json.id;
        this.functions.saveSession(this.user);
      }

      if (typeof result[0].text !== 'undefined') {
        this.functions.toastAlert(result[0]);
      }
    }
  }

  logout() {
    this.user = null;
    this.afAuth.auth.signOut();
  }
}
