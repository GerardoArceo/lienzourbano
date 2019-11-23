import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FunctionsService } from 'src/app/services/functions.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnChanges {

  @Input() idUser: string;

  user;
  loading = true;

  constructor(public functions: FunctionsService,
              public api: ApiService) { }

  async ngOnChanges() {
    if (!this.idUser) {
      return;
    }
    this.user = (await this.api.executeQuery('getUser', {idUser: this.idUser}))[0][0];
    this.loading = false;
  }

}
