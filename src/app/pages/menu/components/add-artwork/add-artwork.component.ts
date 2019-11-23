import { Component, OnInit } from '@angular/core';
import { FunctionsService } from 'src/app/services/functions.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-artwork',
  templateUrl: './add-artwork.component.html',
  styles: []
})
export class AddArtworkComponent implements OnInit {

  categories = [];
  categoriesSelected = [];
  imgUrl;

  constructor(public functions: FunctionsService,
              public api: ApiService) {
  }

  ngOnInit() {
  }

  async onOpen() {
    this.categories = (await this.api.executeQuery('getCategories'))[0];
    this.categoriesSelected = [];
  }

  addCategory(i) {
    const c = this.categories[i];
    if (c) {
      this.categoriesSelected.push({name: c.name, id: c.id});
      this.categories.splice(i, 1);
    }
  }

  delete_category(index: number) {
    this.categories.push(this.categoriesSelected[index]);
    this.categoriesSelected.splice(index, 1);
  }

  previewImage(image) {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      this.imgUrl = reader.result;
    };
  }

  async addArtwork(title, description) {
    if (!this.imgUrl) {
      this.functions.toastAlert2({title: 'ERROR', text: 'Imagen inválida', type: 'error'});
      return;
    }
    if (!title) {
      this.functions.toastAlert2({title: 'ERROR', text: 'Nombre inválido', type: 'error'});
      return;
    }
    if (!description) {
      this.functions.toastAlert2({title: 'ERROR', text: 'Descripción inválida', type: 'error'});
      return;
    }
    if (this.categoriesSelected.length < 1) {
      this.functions.toastAlert2({title: 'ERROR', text: 'Agrega al menos una categoría', type: 'error'});
      return;
    }

    const idArtwork = (await this.api.executeQuery('addArtwork', {title, description, image: this.imgUrl}))[0];
    await this.saveCategories(idArtwork[0].idArtwork);
    this.functions.toastAlert({type: 'success', title: 'ÈXITO', text: 'Obra agregada'});
  }

  async saveCategories(idArtwork) {
    for (const c of this.categoriesSelected) {
      await this.api.executeAction('addArtworkCategory', {idArtwork, idCategory: c.id});
    }
  }
}
