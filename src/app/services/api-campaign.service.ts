import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { environment } from 'src/environments/environment';
import { campaign } from 'src/app/model/campaign';
import { SeecampaignPage } from '../pages/index-pages/seecampaign/seecampaign.page';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ApiCampaignService {

  constructor(private http: HTTP,
    private modalController: ModalController) { }

  /**
   * 
   * @param cdcam si no está presente realizará un getAll -> http://localhost:8080/campaign
   * , si existe realizará una selección por cdcam -> http://localhost:8080/campaign/cdcam
   */
  public getCampaign(cdcam?:number | string): Promise<campaign[] | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiCampaign
      if (cdcam) {
        endpoint += cdcam;
      }
      this.http
        .get(endpoint, {}, this.header)
        .then(d => {
          if (d) {
            resolve(JSON.parse(d.data));
          } else {
            resolve(null);
          }
        })
        .catch(err => reject(err));
    });
  }

  /**
   * 
   * @param namecampaign el criterio de búsqueda por nombre de la
   * campaña -> http://localhost:8080/campaign/search/namecampaign
   */
  public searchByName(namecampaign: string): Promise<campaign[] | null> {
    return this.getCampaign('search/' + namecampaign);
  }

  /**
   * 
   * @param campaign es un número -> cdcam, campaign -> campaign.cdcam
   */
  public removeCampaign(campaign: any): Promise<void> {
    const cdcam: any = campaign.cdcam ? campaign.cdcam : campaign;
    const endpoint = environment.endpoint + environment.apiCampaign + cdcam;
    return new Promise((resolve, reject) => {
      this.http
        .delete(endpoint, {}, this.header)
        .then(d => {
          resolve();
        })
        .catch(err => reject(err));
    });
  }

  //_______________________________________________________________CREATE
  public createCampaign(campaign: campaign): Promise<void> {
    const endpoint = environment.endpoint + environment.apiCampaign;
    return new Promise((resolve, reject) => {
      if (campaign) {
        this.http.setDataSerializer('json'); //send body as json, needed
        this.http
          .post(endpoint, campaign, this.header)
          .then(d => {
            resolve();
          })
          .catch(err => reject(err));
      } else {
        reject('No existe la campaña');
      }
    });
  }

  //_______________________________________________________________UPDATE
  public updateCampaign(campaign: campaign): Promise<void> {
    const endpoint = environment.endpoint + environment.apiCampaign;
    return new Promise((resolve, reject) => {
      if (campaign) {
        this.http.setDataSerializer('json'); //send body as json, needed
        this.http
          .put(endpoint, campaign, this.header)
          .then(d => {
            resolve();
          })
          .catch(err => reject(err));
      } else {
        reject('No existe la campaña');
      }
    });
  }

  //_______________________________________________________________HEADER
  private get header(): any {
    return {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    };
  }

  //_______________________________________________________________Entrar personaje
  async seeCP(campaign: campaign) {
    const modal = await this.modalController.create({
      component: SeecampaignPage,
      cssClass: 'my-custom-class',
      componentProps: {
        campaign: campaign
      }
    });
    return await modal.present();
  }
}
