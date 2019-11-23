import { Component, OnInit, OnChanges } from '@angular/core';
import { FunctionsService } from 'src/app/services/functions.service';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artwork',
  templateUrl: './artwork.component.html',
  styles: []
})
export class ArtworkComponent implements OnChanges {

  loading = true;
  idArtwork = '';
  artwork;
  comments;
  user;
  show = true;

  constructor(public functions: FunctionsService,
              public api: ApiService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idArtwork = params.idArtwork;
      this.ngOnChanges();
    });
    this.user = this.functions.getUser();
  }

  async ngOnChanges() {
    this.artwork = (await this.api.executeQuery('getArtwork', {idArtwork: this.idArtwork}))[0][0];
    this.loading = false;
    this.getComments();
    if (this.artwork.idArtist === this.user.id) {
      this.show = false;
    }
  }

  async getComments() {
    this.comments = (await this.api.executeQuery('getComments', {idArtwork: this.idArtwork}))[0];
  }

  async addComment(comment) {
    await this.api.executeAction('addComment', {idArtwork: this.idArtwork, comment});
    this.getComments();
  }

  async addFavoriteArtwork() {
    await this.api.executeAction('addFavoriteArtwork', {idArtwork: this.idArtwork});
  }

  async addFollower() {
    await this.api.executeAction('addFollower', {idArtist: this.artwork.idArtist });
  }

  async addAuction(initialPrize, duration) {
    if (initialPrize < 0) {
      this.functions.toastAlert2({title: 'ERROR', text: 'Precio inválido', type: 'error'});
      return;
    }
    if (duration < 0) {
      this.functions.toastAlert2({title: 'ERROR', text: 'Duración inválida', type: 'error'});
      return;
    }
    const postingDate = this.functions.getTimestamp();
    const x = new Date(postingDate);
    const y = new Date(x.getTime() + duration * 1000 * 60 * 60);
    const closeDate = y.toISOString().split('T')[0] + ' ' + y.toLocaleTimeString();
    await this.api.executeAction('addAuction', {idArtwork: this.idArtwork, initialPrize, postingDate, closeDate});
  }
}
