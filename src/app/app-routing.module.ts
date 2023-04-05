import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { PrincipalhomeComponent } from './pages/compartilhado/principalhome/principalhome.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {
    path: '', component: PrincipalhomeComponent,
    children: [
      { path: '', component: HomeComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
