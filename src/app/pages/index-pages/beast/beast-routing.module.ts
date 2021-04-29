import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeastPage } from './beast.page';

const routes: Routes = [
  {
    path: '',
    component: BeastPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeastPageRoutingModule {}
