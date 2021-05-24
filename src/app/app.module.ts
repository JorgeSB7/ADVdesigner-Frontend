import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { AuthService } from './services/auth.service';
import { MenuComponent } from './component/menu/menu.component';
import { ApiService } from './services/api.service';
import { HTTP } from '@ionic-native/http/ngx';
import { ApiCharacterService } from './services/api-character.service';
import { ApiCampaignService } from './services/api-campaign.service';
import { UiService } from './services/ui.service';
import { FormcharacterPage } from './pages/index-pages/formcharacter/formcharacter.page';
import { FormcampaignPage } from './pages/index-pages/formcampaign/formcampaign.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Camera } from '@ionic-native/camera/ngx';
import { ImageaddService } from './services/imageadd.service';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer} from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, MenuComponent, FormcharacterPage, FormcampaignPage],
  exports: [MenuComponent],
  entryComponents: [FormcharacterPage, FormcampaignPage],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    FormsModule,
    
    ReactiveFormsModule],
  providers: [
    UiService,
    ApiService,
    ApiCharacterService,
    ApiCampaignService,
    HTTP,
    Camera,
    File,
    FileTransfer,
    StatusBar,
    SplashScreen,
    NativeStorage,
    GooglePlus,
    FileOpener,
    ImageaddService,
    AuthService,
    TextToSpeech,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
