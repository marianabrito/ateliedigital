import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContatoComponent } from './contato.component';
import { EditFormComponent } from './edit-form/edit-form.component';

const routes: Routes = [
  { path: '', component: ContatoComponent },
  { path: ':id', component: EditFormComponent },
  { path: 'new', component: EditFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContatoRoutingModule { }
