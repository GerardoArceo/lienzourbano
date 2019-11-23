import { Component, OnInit } from '@angular/core';
import { FunctionsService } from 'src/app/services/functions.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor(public functions: FunctionsService,
              public api: ApiService) {
  }

  ngOnInit() {
  }

  register(name, email, pass, address, contact) {
    if (name.length < 1 || name.length > 50) {
      this.functions.toastAlert2({title: 'ERROR', text: 'Nombre inválido', type: 'error'});
      return;
    }
    if (email.length < 1 || email.length > 50) {
      this.functions.toastAlert2({title: 'ERROR', text: 'Email inválido', type: 'error'});
      return;
    }
    if (pass.length < 1 || pass.length > 50) {
      this.functions.toastAlert2({title: 'ERROR', text: 'Contraseña inválida', type: 'error'});
      return;
    }
    if (address.length < 1 || address.length > 50) {
      this.functions.toastAlert2({title: 'ERROR', text: 'Dirección inválida', type: 'error'});
      return;
    }
    if (contact.length < 1 || contact.length > 5000) {
      this.functions.toastAlert2({title: 'ERROR', text: 'Contacto inválido', type: 'error'});
      return;
    }
    this.api.executeAction('addUser', {name, email, pass, address, contact, photo: ''});
  }

}
