import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroe.interface';
@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
  transform(heroe: Heroe): string {
    return heroe.alt_img ?? `assets/heroes/${heroe.id}.jpg`
  }
}