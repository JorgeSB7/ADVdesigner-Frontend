import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSearchbar } from '@ionic/angular';
import { campaign } from 'src/app/model/campaign';
import { ApiCampaignService } from 'src/app/services/api-campaign.service';
import { AuthService } from 'src/app/services/auth.service';
import { UiService } from 'src/app/services/ui.service';
import { FormcampaignPage } from '../formcampaign/formcampaign.page';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.page.html',
  styleUrls: ['./campaigns.page.scss'],
})
export class CampaignsPage implements OnInit {
  private campanias: Array<campaign>;
  private iduser = this.auth.getUser().id;
  @ViewChild('input', {static: false}) myInput: IonSearchbar;
  

  constructor(private apiCam:ApiCampaignService,
    private ui:UiService,
    private alertController: AlertController,
    private auth: AuthService) { }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    await this.loadAll();
  }

  //________________________________________________loadAll
  public async loadAll() {
    await this.ui.showLoading();
    try {
      this.campanias = await this.apiCam.getCampaign();
      await this.ui.hideLoading();
    } catch (err) {
      this.campanias = null; //vista
      await this.ui.hideLoading();
      await this.ui.showToast(err.error, "danger");
    }
  }

  //________________________________________________removeCampaign
  public async removeCampaign(campaign: campaign) {
    await this.ui.showLoading();
    this.apiCam
      .removeCampaign(campaign)
      .then(async d => await this.loadAll())
      .catch(async err => await this.ui.showToast(err.error, "danger"))
      .finally(async () => {
        await this.ui.hideLoading();
      });
  }

  //________________________________________________searchCampaign
  public async searchCampaign($event) {
    console.log($event);
    let value = $event.detail.value;
    console.log(value);
    value = value.trim();
    if (value !== '') {
      //await this.ui.showLoading();
      this.apiCam.searchByName(value)
      .then(d => {
        this.campanias = d;
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

  //________________________________________________addCampaign
  public async addCampaign() {
    const campaignToBeAdd = await this.ui.showModal(FormcampaignPage, { campaign: {} });
    console.log(campaignToBeAdd);
    try {
      if (campaignToBeAdd.data) {
        // si no cierra
        await this.ui.showLoading();
        await this.apiCam.createCampaign(campaignToBeAdd.data);
        await this.loadAll();
      }
    } catch (err) {
      await this.ui.hideLoading();
      await this.ui.showToast(err.error, "danger");
    }
  }

  //________________________________________________editCampaign
  public async editCampaign(_campaign: campaign) {
    const campaignToBeUpdated = await this.ui.showModal(FormcampaignPage, { campaign : _campaign });
    try {
      if (campaignToBeUpdated.data) {
        // si no cierra
        await this.ui.showLoading();
        await this.apiCam.updateCampaign(campaignToBeUpdated.data);
        await this.loadAll();
      }
    } catch (err) {
      await this.ui.hideLoading();
      await this.ui.showToast(err.error, "danger");
    }
  }

  //__________________________________________________________AMPLIAR PERSONAJE
  public seecam(campaign: campaign){
    this.apiCam.seeCP(campaign);
  }
  
  //__________________________________________________________ALERT DELETE
  async presentAlertCam(campaign: campaign) {
    const alert = await this.alertController.create({
      header: '¿Desea eliminar la campaña?',
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
          this.removeCampaign(campaign);
        }
      }]
    });

    await alert.present();
  }
}
