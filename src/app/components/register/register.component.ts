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
    this.api.executeAction('addUser', {name, email, pass, address, contact});
  }

}
