import { Component } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html'
})
export class BuscarComponent {
  public termino: string = ''
  public heroes: Heroe[] = []
  public heroeSelected!: Heroe | undefined
  constructor(private heroesService: HeroesService) { }
  buscando() {
    if (this.termino.trim().length > 0) {
      this.heroesService.getSugerencias(this.termino.trim()).subscribe(heroes => {
        heroes.length > 0 ? this.heroes = heroes : this.heroes = []
      })
    }
  }
  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    if (event.option.value) {
      const heroe: Heroe = event.option.value
      this.termino = heroe.superhero
      this.heroesService.getHeroeByID(heroe.id!).subscribe(heroe => this.heroeSelected = heroe)
    } else this.heroeSelected = undefined
  }
}