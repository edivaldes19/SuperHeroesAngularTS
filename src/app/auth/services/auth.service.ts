import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { map, tap } from "rxjs/operators";
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL: string = environment.base_url
  private _auth: Auth | undefined
  constructor(private http: HttpClient) { }
  public get auth(): Auth {
    return { ...this._auth! }
  }
  login() {
    return this.http.get<Auth>(`${this.BASE_URL}/usuarios/1`).pipe(tap(auth => this._auth = auth), tap(auth => localStorage.setItem('token', auth.id)))
  }
  logout() {
    this._auth = undefined
  }
  verificarAuth(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false)
    return this.http.get<Auth>(`${this.BASE_URL}/usuarios/1`).pipe(map(auth => {
      this._auth = auth
      return true
    }))
  }
}