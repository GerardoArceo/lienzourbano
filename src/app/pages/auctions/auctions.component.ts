import { Component, OnInit } from '@angular/core';
import { FunctionsService } from 'src/app/services/functions.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-auctions',
  templateUrl: './auctions.component.html',
  styles: []
})
export class AuctionsComponent implements OnInit {

  loading = true;
  artworks = [];

  constructor(public functions: FunctionsService,
              public api: ApiService) { }

  async ngOnInit() {
    const now = this.functions.getTimestamp();
    this.artworks = (await this.api.executeQuery('getOpenAuctions', {now}))[0];
    this.api.subscribeAuction().subscribe((data) => {
      if (!data) {
        return;
      }
      for (const a of this.artworks) {
        if (a.id === data.idAuction) {
          a.actualPrize = data.prize;
        }
      }
    });

    this.loading = false;
  }

  openArtwork(idArtwork) {
    this.functions.navigate('artwork', {idArtwork});
  }

  updateAuction(i, prize) {
    if (Number(prize) <= Number(this.artworks[i].actualPrize)) {
      this.functions.toastAlert({title: 'ERROR', text: 'Debes ofrecer un precio mayor al actual', type: 'error'});
      return;
    }
    if (new Date().getTime() > new Date(this.artworks[i].closeDate).getTime()) {
      this.functions.toastAlert({title: 'ERROR', text: 'Esta subasta acaba de finalizar', type: 'error'});
      return;
    }
    const idAuction = this.artworks[i].id;
    this.api.executeAction('updateAuction', {idAuction, prize});
    this.api.updateAuction(idAuction, prize);
  }
}
