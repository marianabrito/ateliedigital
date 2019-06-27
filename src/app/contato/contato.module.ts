import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { ContatoRoutingModule } from './contato-routing.module';
import { ContatoComponent } from './contato.component';

@NgModule({
  declarations: [
    ContatoComponent
  ],

  imports: [
    CommonModule,
    ContatoRoutingModule,
FormsModule,

  ],

})
export class ContatoModule { }
