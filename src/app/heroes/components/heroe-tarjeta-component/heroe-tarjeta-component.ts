import { Component, Input } from '@angular/core';
import { Heroe } from '../../interfaces/heroe.interface';
@Component({
  selector: 'app-heroe-tarjeta-component',
  templateUrl: './heroe-tarjeta-component.html',
  styleUrls: ['./heroe-tarjeta-component.css']
})
export class HeroeTarjetaComponent {
  @Input() public heroe!: Heroe
}