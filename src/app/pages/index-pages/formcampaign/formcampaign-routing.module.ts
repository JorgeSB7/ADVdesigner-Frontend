import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormcampaignPage } from './formcampaign.page';

const routes: Routes = [
  {
    path: '',
    component: FormcampaignPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormcampaignPageRoutingModule {}
