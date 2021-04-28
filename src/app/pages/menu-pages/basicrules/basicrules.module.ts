import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BasicrulesPageRoutingModule } from './basicrules-routing.module';
import { TranslateModule } from '@ngx-translate/core';

import { BasicrulesPage } from './basicrules.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BasicrulesPageRoutingModule,
    TranslateModule
  ],
  declarations: [BasicrulesPage]
})
export class BasicrulesPageModule {}
