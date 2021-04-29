import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeebeastPage } from './seebeast.page';

const routes: Routes = [
  {
    path: '',
    component: SeebeastPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeebeastPageRoutingModule {}
