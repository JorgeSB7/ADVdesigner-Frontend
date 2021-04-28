import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeecharacterPageRoutingModule } from './seecharacter-routing.module';

import { SeecharacterPage } from './seecharacter.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeecharacterPageRoutingModule,
    TranslateModule
  ],
  declarations: [SeecharacterPage]
})
export class SeecharacterPageModule {}
