import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';
import { FunctionsService } from 'src/app/services/functions.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  mensaje: string;
  element: any;
  input: any;
  user: User;
  @Input() idArtist: string;
  loading = true;

  constructor(public api: ApiService,
              public functions: FunctionsService) {
  }

  async ngOnInit() {
    this.element = document.getElementById('appMensajes');
    this.user = this.functions.getUser();

    const user1 = (await this.api.executeQuery('getUser', {idUser: this.user.id}))[0][0];
    const user2 = (await this.api.executeQuery('getUser', {idUser: this.idArtist}))[0][0];

    this.api.cargarMensajes(user1, user2).subscribe(() => {
      this.loading = false;
      setTimeout(() => {
        this.element.scrollTop = this.element.scrollHeight;
      }, 100);
    });
  }

  enviarMensaje() {
    if (this.mensaje.length === 0) {
      return;
    }
    const m = this.mensaje;
    this.mensaje = '';
    this.api.agregarMensaje(m, this.idArtist);
  }

}
