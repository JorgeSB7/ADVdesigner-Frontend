import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeemagicPageRoutingModule } from './seemagic-routing.module';

import { SeemagicPage } from './seemagic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeemagicPageRoutingModule
  ],
  declarations: [SeemagicPage]
})
export class SeemagicPageModule {}
