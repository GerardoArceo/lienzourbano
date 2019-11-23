import { Component, Input, OnChanges } from '@angular/core';
import { FunctionsService } from 'src/app/services/functions.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnChanges {

  @Input() type: string;
  @Input() id: string;

  loading = true;
  artists = [];

  constructor(public functions: FunctionsService,
              public api: ApiService) {
    this.ngOnChanges();
  }

  async ngOnChanges() {
    switch (this.type) {
      case 'getFollows':
        this.artists = (await this.api.executeQuery('getFollows'))[0];
        break;
      case 'getFollowers':
        this.artists = (await this.api.executeQuery('getFollowers'))[0];
        break;
    }
    this.loading = false;
  }

  openArtwork(idArtwork) {
    this.functions.navigate('artwork', {idArtwork});
  }
}
