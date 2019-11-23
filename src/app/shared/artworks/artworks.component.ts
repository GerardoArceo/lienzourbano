import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FunctionsService } from 'src/app/services/functions.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-artworks',
  templateUrl: './artworks.component.html',
  styles: []
})
export class ArtworksComponent implements OnChanges {

  @Input() type: string;
  @Input() id: string;

  loading = true;
  artworks = [];

  constructor(public functions: FunctionsService,
              public api: ApiService) { }

  async ngOnChanges() {
    switch (this.type) {
      case 'getArtworksArtist':
        this.artworks = (await this.api.executeQuery('getArtworksArtist', {idArtist: this.id}))[0];
        for (const a of this.artworks) {
          a.idArtwork = a.id;
        }
        break;
      case 'getArtworksCategory':
        this.artworks = (await this.api.executeQuery('getArtworksCategory', {idCategory: this.id}))[0];
        break;
      case 'getArtworksArtist':
        this.artworks = (await this.api.executeQuery('getArtworksArtist', {idArtist: this.id}))[0];
        break;
      case 'getTopArtworks':
        this.artworks = (await this.api.executeQuery('getTopArtworks'))[0];
        break;
      case 'searchArtWork':
          this.artworks = (await this.api.executeQuery('searchArtWork', {search: this.id}));
          if (this.artworks) {
            this.artworks = this.artworks[0];
            for (const a of this.artworks) {
              a.idArtwork = a.id;
            }
          } else {
            this.artworks = [];
          }
          break;
      case 'getFavorites':
        this.artworks = (await this.api.executeQuery('getFavorites'))[0];
        break;
      case 'getWonAuctions':
        this.artworks = (await this.api.executeQuery('getWonAuctions'))[0];
        break;
    }
    this.loading = false;
  }

  openArtwork(idArtwork) {
    this.functions.navigate('artwork', {idArtwork});
  }

}
