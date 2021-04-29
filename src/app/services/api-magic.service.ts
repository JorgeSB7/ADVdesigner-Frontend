import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { ModalController } from '@ionic/angular';
import { magic } from '../model/magic';
import { SeemagicPage } from '../pages/index-pages/seemagic/seemagic.page';

@Injectable({
  providedIn: 'root'
})
export class ApiMagicService {

  constructor(private http: HTTP,
    private authS: AuthService,
    private modalController: ModalController) { }

  // http://localhost:8080/magic/user/id
  public getMagic(codem?:number | string): Promise<magic[] | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiMagicU + this.authS.getUser().id;
      if (codem) {
        endpoint += codem;
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
   * @param codem si no está presente realizará un getAll -> http://localhost:8080/magic
   * , si existe realizará una selección por codem -> http://localhost:8080/magic/codem
   */
  public getMagicA(codem?:number | string): Promise<magic[] | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiMagic;
      if (codem) {
        endpoint += codem;
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
   * @param namemagic el criterio de búsqueda por nombre del
   * conjuro -> http://localhost:8080/magic/search/namemagic
   */
  public searchByName(namemagic: string): Promise<magic[] | null> {
    return this.getMagicA('search/' + namemagic + '/user/' + this.authS.getUser().id);
  }

  /**
   * 
   * @param magic es un número -> codem, magic -> magic.codem
   */
  public removeMagic(magic: any): Promise<void> {
    const codem: any = magic.codem ? magic.codem : magic;
    const endpoint = environment.endpoint + environment.apiMagic + codem;
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
  public createMagic(magic: magic): Promise<void> {
    const endpoint = environment.endpoint + environment.apiMagic;
    console.log(magic);
    return new Promise((resolve, reject) => {
      if (magic) {
        this.http.setDataSerializer('json'); //send body as json, needed
        this.http
          .post(endpoint, magic, this.header)
          .then(d => {
            resolve();
          })
          .catch(err => reject(err));
      } else {
        reject('No existe el conjuro');
      }
    });
  }

  //_______________________________________________________________UPDATE
  public updateMagic(magic: magic): Promise<void> {
    console.log(magic);
    const endpoint = environment.endpoint + environment.apiMagic;
    console.log(endpoint);
    return new Promise((resolve, reject) => {
      if (magic) {
        this.http.setDataSerializer('json'); //send body as json, needed
        this.http
          .put(endpoint, magic, this.header)
          .then(d => {
            resolve();
          })
          .catch(err => reject(err));
      } else {
        reject('No existe el conjuro');
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

  //_______________________________________________________________Entrar conjuro
  async seePJ(magic: magic) {
    const modal = await this.modalController.create({
      component: SeemagicPage,
      cssClass: 'my-custom-class',
      componentProps: {
        magic: magic
      }
    });
    return await modal.present();
  }
}
