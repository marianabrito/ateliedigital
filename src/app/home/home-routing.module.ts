import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes),[
    HomeComponent
  ]

  ],
  exports: [RouterModule,
    HomeComponent

  ]
})
export class HomeRoutingModule { }
