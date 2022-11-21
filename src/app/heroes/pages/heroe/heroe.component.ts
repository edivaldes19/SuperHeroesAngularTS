import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from "rxjs/operators";
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
  public heroe!: Heroe
  constructor(private heroesService: HeroesService, private activatedRoute: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroeByID(id)))
      .subscribe(heroe => this.heroe = heroe)
  }
  volver(): void {
    this.router.navigate(['/heroes/listado'])
  }
}