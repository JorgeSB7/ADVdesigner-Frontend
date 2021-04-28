import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeecampaignPageRoutingModule } from './seecampaign-routing.module';

import { SeecampaignPage } from './seecampaign.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeecampaignPageRoutingModule,
    TranslateModule
  ],
  declarations: [SeecampaignPage]
})
export class SeecampaignPageModule {}
