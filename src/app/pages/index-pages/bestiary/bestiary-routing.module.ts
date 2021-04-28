import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BestiaryPage } from './bestiary.page';

const routes: Routes = [
  {
    path: '',
    component: BestiaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BestiaryPageRoutingModule {}
