import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { environment } from 'src/environments/environment';
import { beast } from 'src/app/model/beast';
import { AuthService } from './auth.service';
import { ModalController } from '@ionic/angular';
import { SeebeastPage } from '../pages/index-pages/seebeast/seebeast.page';

@Injectable({
  providedIn: 'root'
})
export class ApiBeastService {

  constructor(private http: HTTP,
    private authS: AuthService,
    private modalController: ModalController) { }

  // http://localhost:8080/beast/user/id
  public getBeast(codeb?: number | string): Promise<beast[] | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiBeastU + this.authS.getUser().id;
      if (codeb) {
        endpoint += codeb;
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
   * @param codeb si no está presente realizará un getAll -> http://localhost:8080/beast
   * , si existe realizará una selección por codeb -> http://localhost:8080/beast/codeb
   */
  public getBeastA(codeb?: number | string): Promise<beast[] | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiBeast;
      if (codeb) {
        endpoint += codeb;
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
   * @param namebeast el criterio de búsqueda por nombre de la
   * bestia -> http://localhost:8080/beast/search/namebeast
   */
  public searchByName(namebeast: string): Promise<beast[] | null> {
    return this.getBeastA('search/' + namebeast + '/user/' + this.authS.getUser().id);
  }

  /**
   * 
   * @param beast es un número -> codeb, beast -> beast.codeb
   */
  public removeBeast(beast: any): Promise<void> {
    const codeb: any = beast.codeb ? beast.codeb : beast;
    const endpoint = environment.endpoint + environment.apiBeast + codeb;
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
  public createBeast(beast: beast): Promise<void> {
    const endpoint = environment.endpoint + environment.apiBeast;
    console.log(beast);
    return new Promise((resolve, reject) => {
      if (beast) {
        this.http.setDataSerializer('json'); //send body as json, needed
        this.http
          .post(endpoint, beast, this.header)
          .then(d => {
            resolve();
          })
          .catch(err => reject(err));
      } else {
        reject('No existe la bestia');
      }
    });
  }

  //_______________________________________________________________UPDATE
  public updateBeast(beast: beast): Promise<void> {
    console.log(beast);
    const endpoint = environment.endpoint + environment.apiBeast;
    console.log(endpoint);
    return new Promise((resolve, reject) => {
      if (beast) {
        this.http.setDataSerializer('json'); //send body as json, needed
        this.http
          .put(endpoint, beast, this.header)
          .then(d => {
            resolve();
          })
          .catch(err => reject(err));
      } else {
        reject('No existe la bestia');
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

  //_______________________________________________________________Entrar bestia
  async seePJ(beast: beast) {
    const modal = await this.modalController.create({
      component: SeebeastPage,
      cssClass: 'my-custom-class',
      componentProps: {
        beast: beast
      }
    });
    return await modal.present();
  }
}
