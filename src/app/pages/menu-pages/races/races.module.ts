import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RacesPageRoutingModule } from './races-routing.module';
import { TranslateModule } from '@ngx-translate/core';

import { RacesPage } from './races.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RacesPageRoutingModule,
    TranslateModule
  ],
  declarations: [RacesPage]
})
export class RacesPageModule {}
