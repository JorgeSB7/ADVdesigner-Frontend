import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSearchbar } from '@ionic/angular';
import { magic } from 'src/app/model/magic';
import { ApiMagicService } from 'src/app/services/api-magic.service';
import { UiService } from 'src/app/services/ui.service';
import { FormmagicPage } from '../formmagic/formmagic.page';

@Component({
  selector: 'app-magic',
  templateUrl: './magic.page.html',
  styleUrls: ['./magic.page.scss'],
})
export class MagicPage implements OnInit {
  public conjuros: Array<magic>;
  @ViewChild('input', {static: false}) myInput: IonSearchbar ;

  constructor(private apiMag: ApiMagicService,
    private ui:UiService,
    private alertController: AlertController) { }

  ngOnInit() {
  }
  
  async ionViewDidEnter() {
    await this.loadAll();
  }

  //________________________________________________loadAll
  public async loadAll() {
    await this.ui.showLoading();
    try {
      this.conjuros = await this.apiMag.getMagic();
      await this.ui.hideLoading();
    } catch (err) {
      this.conjuros = null; //vista
      await this.ui.hideLoading();
      await this.ui.showToast(err.error, "danger");
    }
  }

  //________________________________________________removeMagic
  public async removeMagic(magic: magic) {
    await this.ui.showLoading();
    this.apiMag
      .removeMagic(magic)
      .then(async d => await this.loadAll())
      .catch(async err => await this.ui.showToast(err.error, "danger"))
      .finally(async () => {
        await this.ui.hideLoading();
      });
  }

  //________________________________________________searchMagic
  public async searchMagic($event) {
    console.log($event);
    let value = $event.detail.value;
    console.log(value);
    value = value.trim();
    if (value !== '') {
      //await this.ui.showLoading();
      this.apiMag.searchByName(value)
      .then(d => {
        this.conjuros = d;
      })
      .catch(async err => await this.ui.showToast(err.error, "danger"))
      .finally(async () => {
       // await this.ui.hideLoading();
       // this.myInput.setFocus();
      });
    } else {
      await this.loadAll();
    }
  }

  //________________________________________________addMagic
  public async addMagic() {
    const magicToBeAdd = await this.ui.showModal(FormmagicPage, { magic: {} });
    console.log(magicToBeAdd);
    try {
      if (magicToBeAdd.data) {
        // si no cierra
        await this.ui.showLoading();
        await this.apiMag.createMagic(magicToBeAdd.data);
        await this.loadAll();
      }
    } catch (err) {
      await this.ui.hideLoading();
      await this.ui.showToast(err.error, "danger");
    }
  }

  //________________________________________________editMagic
  public async editMagic(_magic: magic) {
    const magicToBeUpdated = await this.ui.showModal(FormmagicPage, { magic : _magic });
    try {
      if (magicToBeUpdated.data) {
        console.log(_magic);
        // si no cierra
        await this.ui.showLoading();
        await this.apiMag.updateMagic(magicToBeUpdated.data);
        await this.loadAll();
      }
    } catch (err) {
      await this.ui.hideLoading();
      await this.ui.showToast(err.error, "danger");
    }
  }

  //__________________________________________________________AMPLIAR CONJURO
  public seecha(magic: magic){
    this.apiMag.seePJ(magic);
  }
  
  //__________________________________________________________ALERT DELETE
  async presentAlert(magic: magic) {
    const alert = await this.alertController.create({
      header: '¿Desea eliminar el conjuro?',
      buttons: [{
        text: 'No',
        role: 'cancel',
        handler: () => {
          // Ha respondido que no así que no hacemos nada
        }
      },
      {
        text: 'Confirmar',
        handler: () => {
          // AquÍ borramos el sitio en la base de datos
          this.removeMagic(magic);
        }
      }]
    });

    await alert.present();
  }
}
