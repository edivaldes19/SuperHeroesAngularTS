import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from "rxjs/operators";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {
  public publishers: string[] = ['DC Comics', 'Marvel Comics']
  public heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }
  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    if (this.router.url.includes('editar')) {
      this.activatedRoute.params
        .pipe(switchMap(({ id }) => this.heroesService.getHeroeByID(id)))
        .subscribe(heroe => this.heroe = heroe)
    }
  }
  guardar() {
    if (this.heroe.superhero.trim().length > 0) {
      if (this.heroe.id) this.heroesService.actualizarHeroe(this.heroe).subscribe(heroe => this.showSnackBar('Heroe actualizado exitosamente.'))
      else {
        this.heroesService.agregarHeroe(this.heroe).subscribe(heroe => {
          this.showSnackBar('Heroe creado exitosamente.')
          this.router.navigate(['/heroes/editar', heroe.id])
        })
      }
    }
  }
  borrar() {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: this.heroe
    })
    dialog.afterClosed().subscribe(isPositive => {
      if (isPositive) this.heroesService.borrarHeroe(this.heroe.id!).subscribe(nothing => this.router.navigate(['/heroes/listado']))
    })
  }
  showSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'Aceptar', {
      duration: 2500
    })
  }
}