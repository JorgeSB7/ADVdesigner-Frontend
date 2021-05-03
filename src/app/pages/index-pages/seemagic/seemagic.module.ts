import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeemagicPageRoutingModule } from './seemagic-routing.module';

import { SeemagicPage } from './seemagic.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeemagicPageRoutingModule,
    TranslateModule
  ],
  declarations: [SeemagicPage]
})
export class SeemagicPageModule {}
