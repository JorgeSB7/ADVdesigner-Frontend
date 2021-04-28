import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { environment } from 'src/environments/environment';
import { character } from 'src/app/model/character';
import { AuthService } from './auth.service';
import { SeecharacterPage } from '../pages/index-pages/seecharacter/seecharacter.page';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ApiCharacterService {

  constructor(private http: HTTP,
    private authS: AuthService,
    private modalController: ModalController) { }

  // http://localhost:8080/character/user/id
  public getCharacter(code?:number | string): Promise<character[] | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiCharacterU + this.authS.getUser().id;
      if (code) {
        endpoint += code;
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
   * @param code si no está presente realizará un getAll -> http://localhost:8080/character
   * , si existe realizará una selección por code -> http://localhost:8080/character/code
   */
  public getCharacterA(code?:number | string): Promise<character[] | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiCharacter;
      if (code) {
        endpoint += code;
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
   * @param namecharacter el criterio de búsqueda por nombre del
   * personaje -> http://localhost:8080/character/search/namecharacter
   */
  public searchByName(namecharacter: string): Promise<character[] | null> {
    return this.getCharacterA('search/' + namecharacter + '/user/' + this.authS.getUser().id);
  }

  /**
   * 
   * @param character es un número -> code, character -> character.code
   */
  public removeCharacter(character: any): Promise<void> {
    const code: any = character.code ? character.code : character;
    const endpoint = environment.endpoint + environment.apiCharacter + code;
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
  public createCharacter(character: character): Promise<void> {
    const endpoint = environment.endpoint + environment.apiCharacter;
    console.log(character);
    return new Promise((resolve, reject) => {
      if (character) {
        this.http.setDataSerializer('json'); //send body as json, needed
        this.http
          .post(endpoint, character, this.header)
          .then(d => {
            resolve();
          })
          .catch(err => reject(err));
      } else {
        reject('No existe el personaje');
      }
    });
  }

  //_______________________________________________________________UPDATE
  public updateCharacter(character: character): Promise<void> {
    console.log(character);
    const endpoint = environment.endpoint + environment.apiCharacter;
    console.log(endpoint);
    return new Promise((resolve, reject) => {
      if (character) {
        this.http.setDataSerializer('json'); //send body as json, needed
        this.http
          .put(endpoint, character, this.header)
          .then(d => {
            resolve();
          })
          .catch(err => reject(err));
      } else {
        reject('No existe el personaje');
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
  async seePJ(character: character) {
    const modal = await this.modalController.create({
      component: SeecharacterPage,
      cssClass: 'my-custom-class',
      componentProps: {
        character: character
      }
    });
    return await modal.present();
  }
}
