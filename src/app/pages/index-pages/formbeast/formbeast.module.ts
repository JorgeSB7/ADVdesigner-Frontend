import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormbeastPageRoutingModule } from './formbeast-routing.module';

import { FormbeastPage } from './formbeast.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormbeastPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [FormbeastPage]
})
export class FormbeastPageModule {}
