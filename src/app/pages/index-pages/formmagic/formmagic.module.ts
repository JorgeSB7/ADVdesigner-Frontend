import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormmagicPageRoutingModule } from './formmagic-routing.module';

import { FormmagicPage } from './formmagic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormmagicPageRoutingModule
  ],
  declarations: [FormmagicPage]
})
export class FormmagicPageModule {}
