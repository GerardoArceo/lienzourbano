import { Injectable, EventEmitter, Output } from '@angular/core';
import { SweetAlert2LoaderService } from '@sweetalert2/ngx-sweetalert2';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  @Output() sessionEmitter: EventEmitter<{}> = new EventEmitter<{}>();
  public user: User;

  constructor(private router: Router,
              private toastr: ToastrService,
              private readonly sweetAlert2Loader: SweetAlert2LoaderService) {}

  // ACTIONS
  saveAction(accion: string, params?: {}) {
    const actions = this.getActions();
    actions.push({accion, params});
    localStorage.setItem('actions', JSON.stringify(actions));
  }

  getActions() {
    return JSON.parse(localStorage.getItem('actions'));
  }


  // SESSION
  saveSession(session: User) {
    localStorage.setItem('session', JSON.stringify(session));
    this.sessionEmitter.emit(session);
    this.user = session;
  }

  getSession() {
    const s = localStorage.getItem('session');
    if (s) {
      return JSON.parse(s);
    } else {
      return null;
    }
  }

  getUser(): User {
    const s = this.getSession();
    if (s) {
      return new User(s);
    } else {
      return null;
    }
  }

  closeSession() {
    localStorage.clear();
    this.toastAlert({title: 'OK', text: 'Sesión cerrada', type: 'info'});
    this.sessionEmitter.emit(null);
    this.navigate('home');
  }

  activeSessionEmitter() {
    this.sessionEmitter.emit(this.getSession());
  }

  getSessionEmitter() {
    return this.sessionEmitter;
  }


  getTodayDate() {
    return new Date().toISOString().split('T')[0];
  }

  getTime() {
    return new Date().toLocaleTimeString();
  }

  getTimestamp() {
    return this.getTodayDate() + ' ' + this.getTime();
  }

  // REDIRECTS

  navigate(route: string, queryParams?: any) {
    this.router.navigate(['/' + route], { queryParams });
  }

  validateSession() {
    const user = this.getSession();
    if (!user) {
      this.router.navigate (['/piase']);
    }
  }

  validateFullSession() {
    const user = this.getSession();
    if (!user || !user.id) {
      this.router.navigate (['/piase']);
    }
    return user;
  }

  // ALERTS

  async loadingAlert(title = 'Cargando...') {
    const swal = await this.sweetAlert2Loader.swal;
    swal.fire({
      title,
      imageUrl: 'assets/images/cargando.gif',
      imageAlt: 'Cargando...',
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
      onOpen() {
        setTimeout(() => swal.close(), 2000);
      },
      animation: true
    });
  }

  async closeAlert() {
    const swal = await this.sweetAlert2Loader.swal;
    swal.fire({
      showCancelButton: false,
      showConfirmButton: false,
      onOpen() { swal.close(); }
    });
  }

  async toastAlert(alerta: {title: string, text: string, type: 'success' | 'error' | 'info'}) {
    const swal = await this.sweetAlert2Loader.swal;
    swal.fire({
      title: alerta.title,
      text: alerta.text,
      type: alerta.type,
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000
    });
  }

  toastAlert2(alerta: {title: string, text: string, type: 'success' | 'error' | 'info'}) {
    switch (alerta.type) {
      case 'success':
        this.toastr.success(alerta.text, alerta.title);
        break;
      case 'error':
        this.toastr.error(alerta.text, alerta.title);
        break;
      case 'info':
        this.toastr.info(alerta.text, alerta.title);
        break;
    }
  }
}
