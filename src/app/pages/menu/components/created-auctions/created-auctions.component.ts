import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FunctionsService } from 'src/app/services/functions.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-created-auctions',
  templateUrl: './created-auctions.component.html',
  styles: []
})
export class CreatedAuctionsComponent implements OnInit {

  user: User;
  loading = true;
  auctions;

  constructor(public functions: FunctionsService,
              public api: ApiService) { }

  ngOnInit() {
    this.user = this.functions.getSession();
  }

  async onOpen() {
    this.auctions = (await this.api.executeQuery('getAuctionsArtist'))[0];
    console.log(this.auctions);
  }

  openArtwork(idArtwork) {
    this.functions.navigate('artwork', {idArtwork});
  }
}
