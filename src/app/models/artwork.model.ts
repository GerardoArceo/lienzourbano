import { ApiService } from '../services/api.service';
import { FunctionsService } from '../services/functions.service';

export class Artwork {

    public api: ApiService;
    public functions: FunctionsService;

    constructor(public id: number = null,
                public idCreator: string = null,
                public title: string = null,
                public description: string = null,
                public image: string = null,
                public publicationDate: string = null) {
    }

    openArtwork(idArtwork) {
        this.functions.navigate('artwork', {idArtwork});
    }

    async loadCategories() {
        const categories = (await this.api.executeQuery('getCategories'))[0];
        for (const c of categories) {
          c.artworks = (await this.api.executeQuery('getArtworksCategory', {idCategory: c.id}))[0];
        }
        return categories;
    }

    async addArtwork(title, description, categoriesSelected) {

        if (!title) {
          this.functions.toastAlert2({title: 'ERROR', text: 'Nombre inválido', type: 'error'});
          return;
        }
        if (!description) {
          this.functions.toastAlert2({title: 'ERROR', text: 'Descripción inválida', type: 'error'});
          return;
        }
        if (categoriesSelected.length < 1) {
          this.functions.toastAlert2({title: 'ERROR', text: 'Agrega al menos una categoría', type: 'error'});
          return;
        }
        const imgUrl = '';
        const idArtwork = (await this.api.executeQuery('addArtwork', {title, description, image: imgUrl}))[0];
        this.functions.toastAlert({type: 'success', title: 'ÈXITO', text: 'Obra agregada'});
    }

    async saveCategories(idArtwork, categoriesSelected) {
        for (const c of categoriesSelected) {
            await this.api.executeAction('addArtworkCategory', {idArtwork, idCategory: c.id});
        }
    }
}
