import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUsuario } from '../interfaces/IUsuario';
import { Observable, buffer, map, tap } from 'rxjs';
import { IToken } from '../interfaces/IToken';
const endpoint = "api/users/authenticate"

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  logar(usuario: IUsuario) : Observable<IToken> {
    return this.httpClient.post<IToken>(endpoint, usuario).pipe(
      tap((resposta) => {
        debugger;
        if (resposta.access_token == "" || resposta.access_token == undefined) return;
        localStorage.setItem('token', resposta.access_token);
        localStorage.setItem('user', resposta.user_id);
        this.router.navigate(['']);
      })
    )
  }

  deslogar() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  get obterUsuarioLogado(): string|null {
    let user = localStorage.getItem('user')?.toString
    return localStorage.getItem('user')
      ? localStorage.getItem('user')
      : '';
  }

  get obterTokenUsuario(): string|null {
    return localStorage.getItem('token')
      ? localStorage.getItem('token')
      : null;
  }

  get logado(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
}
