import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(image): string {

    if (!image) {
      return 'assets/img/noimage.png';
    }

    if (image.length > 100) {
      if (!image.startsWith('data:image')) {
        image = 'data:image/png;base64,' + image;
      }
      return image;
    } else {
      return 'assets/img/noimage.png';
    }
  }

}