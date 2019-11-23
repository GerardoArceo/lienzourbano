import { Component, OnInit } from '@angular/core';
import { FunctionsService } from 'src/app/services/functions.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styles: []
})
export class CategoriesComponent implements OnInit {

  loading = true;
  categories;
  idCategory;
  categoryName;

  constructor(public functions: FunctionsService,
              public api: ApiService) {
  }

  ngOnInit() {
    this.loadCategories();
  }

  async loadCategories() {
    this.categories = (await this.api.executeQuery('getCategories'))[0];
    for (const c of this.categories) {
      c.artworks = (await this.api.executeQuery('getArtworksCategory', {idCategory: c.id}))[0];
    }
    this.loading = false;
  }

  openArtwork(idArtwork) {
    this.functions.navigate('artwork', {idArtwork});
  }

  openCategory(idCategory, categoryName) {
    this.idCategory = idCategory;
    this.categoryName = categoryName;
  }
}
