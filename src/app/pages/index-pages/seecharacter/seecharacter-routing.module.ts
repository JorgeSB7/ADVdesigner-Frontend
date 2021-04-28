import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeecharacterPage } from './seecharacter.page';

const routes: Routes = [
  {
    path: '',
    component: SeecharacterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeecharacterPageRoutingModule {}
