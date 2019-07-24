import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrdinateurDetailsPage } from './ordinateur-details.page';

const routes: Routes = [
  {
    path: '',
    component: OrdinateurDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrdinateurDetailsPage]
})
export class OrdinateurDetailsPageModule {}
