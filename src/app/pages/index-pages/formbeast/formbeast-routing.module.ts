import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormbeastPage } from './formbeast.page';

const routes: Routes = [
  {
    path: '',
    component: FormbeastPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormbeastPageRoutingModule {}
