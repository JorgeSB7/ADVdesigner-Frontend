import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormmagicPageRoutingModule } from './formmagic-routing.module';

import { FormmagicPage } from './formmagic.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormmagicPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [FormmagicPage]
})
export class FormmagicPageModule {}
