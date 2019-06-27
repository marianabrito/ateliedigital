import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContatoComponent } from './contato.componente';

const routes: Routes = [
  { path: '', component: ContatoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule],

})
export class ContatoRoutingModule { }