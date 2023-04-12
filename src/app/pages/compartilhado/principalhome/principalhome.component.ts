import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'expenseUI-principalhome',
  templateUrl: './principalhome.component.html',
  styleUrls: ['./principalhome.component.scss']
})
export class PrincipalhomeComponent {

  constructor(private usuarioService: UsuarioService){}

  deslogar(){
    this.usuarioService.deslogar()
  }
}
