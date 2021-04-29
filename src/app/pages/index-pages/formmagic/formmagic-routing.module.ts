import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormmagicPage } from './formmagic.page';

const routes: Routes = [
  {
    path: '',
    component: FormmagicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormmagicPageRoutingModule {}
