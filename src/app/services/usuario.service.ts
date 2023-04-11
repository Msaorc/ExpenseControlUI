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
        localStorage.setItem('token', Buffer.from(resposta.access_token).toString('base64'));
        localStorage.setItem('user', Buffer.from(resposta.user_id).toString('base64'));
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
      ? Buffer.from(String(localStorage.getItem('user')), 'base64').toString('binary')
      : '';
  }

  get obterTokenUsuario(): string|null {
    return localStorage.getItem('token')
      ? Buffer.from(String(localStorage.getItem('token')), 'base64').toString('binary')
      : null;
  }

  get logado(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
}
