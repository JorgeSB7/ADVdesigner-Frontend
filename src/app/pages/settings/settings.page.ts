import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { user } from 'src/app/model/user';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ImageaddService } from 'src/app/services/imageadd.service';
import { LanguageService } from 'src/app/services/language.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  lng: any;
  user: user;

  constructor(private modalController: ModalController,
    private language: LanguageService,
    private authS: AuthService,
    private router: Router,
    private ui: UiService,
    private gallery: ImageaddService,
    private apiUser: ApiService) {
    this.user = authS.user;
  }

  ngOnInit() {
  }

  //__________________________________________________________Cambiar idioma
  Langselec = this.language.selected;

  changeLng($event) {
    this.language.setLanguage($event.target.value);
    console.log($event.target.value);
  }
  //__________________________________________________________Cambiar idioma - END

  //__________________________________________________________CerrarSesón
  public async logout() {
    await this.authS.logout();
    if (!this.authS.isLogged()) {
      this.router.navigate(['/login'])
    }
  }
  //__________________________________________________________CerrarSesón - END

  //__________________________________________________________AVATAR USUARIO
  public async setAvatar() {
    await this.ui.showLoading();
    this.gallery.getImage().then(() => {
      if (this.gallery.image === undefined) {
        this.ui.hideLoading();
      } else {
        this.user = {
          id: this.authS.getUser().id,
          name: this.authS.getUser().name,
          avatar: this.gallery.image,
          password: this.authS.getUser().password,
          email: this.authS.getUser().email,
        }
        this.apiUser.updateUser(this.user).then(() => {
        }).catch((err) => {
          console.log(err)
        });
        this.authS.setUser(this.user)
        this.authS.init();
        this.ui.hideLoading();
      }
    }).catch((err) => {
      console.log(err)
    });
  }

  //__________________________________________________________AVATAR USUARIO - END

  public cargaDatos($event = null) {
    try {
      this.authS.init();
      if ($event) {
        $event.target.complete();
      }
    } catch (err) {
      //Error
    }
  }

}
