import { Component } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { MenuController, ModalController } from '@ionic/angular';
import { HelpPage } from '../pages/help/help.page';
import { SettingsPage } from '../pages/settings/settings.page';
import { ApiCharacterService } from '../services/api-character.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private modalController: ModalController,
    private nativeStorage: NativeStorage,
    private authS: AuthService,
    private apiCha: ApiCharacterService,
    private menuCtrl: MenuController) { }

  //__________________________________________________________slideOpts
  slideOpts = {
    grabCursor: true,
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  }
  //__________________________________________________________slideOpts-END

}
