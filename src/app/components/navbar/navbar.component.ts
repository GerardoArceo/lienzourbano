import { Component, OnInit } from '@angular/core';
import { FunctionsService } from 'src/app/services/functions.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  session: boolean;

  constructor(public functions: FunctionsService,
              public api: ApiService) {
    this.subscribeSession();
    this.functions.activeSessionEmitter();
  }

  ngOnInit() {
  }

  subscribeSession() {
    this.functions.getSessionEmitter().subscribe((s: any) => {
      if (s) {
        this.session = true;
      } else {
        this.session = false;
      }
    });
    this.functions.activeSessionEmitter();
  }

  logout() {
    this.functions.closeSession();
    this.api.logout();
  }

  click() {
    const user = this.api.user;
    console.log(user);
  }

}
