import { Component, OnInit } from '@angular/core';
import { FunctionsService } from 'src/app/services/functions.service';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: []
})
export class MenuComponent implements OnInit {

  user: User;
  artistMode = false;

  constructor(public functions: FunctionsService,
              public api: ApiService) { }

  ngOnInit() {
    this.user = this.functions.getSession();
  }

}
