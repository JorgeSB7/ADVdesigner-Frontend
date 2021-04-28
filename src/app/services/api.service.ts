import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { environment } from 'src/environments/environment';
import { user } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HTTP) { }

  public searchCredentials(email:String,pass:String): Promise<user | null> {
    return new Promise((resolve, reject) => {
      const endpoint = environment.endpoint + environment.apiUser+"search/"+email+"/"+pass;
      this.http.get(endpoint, {}, this.header)
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

  public updateUser(item: user): Promise<void> {
    const endpoint = environment.endpoint + environment.apiUser;
    return new Promise((resolve, reject) => {
      if (item) {
        this.http.setDataSerializer('json'); //send body as json, needed
        this.http
          .put(endpoint, item, this.header)
          .then(d => {
            resolve();
          })
          .catch((err) => {
           reject(err)
          });
      } else {
        reject('No existe item');
      }
    });
  }

  public searchEmail(email:String): Promise<user | null> {
    return new Promise((resolve, reject) => {
      const endpoint = environment.endpoint + environment.apiUser+"searching/"+email;
      this.http.get(endpoint, {}, this.header)
        .then(d => {
          if (d) {
            console.log(d.data)
            resolve(JSON.parse(d.data));

          } else {
            resolve(null);
          }


        })
        .catch(err => reject(err));
    });

  }
  public createUser(item: user): Promise<void> {
    const endpoint = environment.endpoint + environment.apiUser;
    return new Promise((resolve, reject) => {
      if (item) {
        
        this.http.setDataSerializer('json'); //send body as json, needed
        this.http
          .post(endpoint, item, this.header)
          .then(d => {
          console.log(d)
            resolve();
          })
          .catch(err => reject(err));
      } else {
        reject('No existe item');
      }
    });
  }

  private get header(): any {
    return {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
      }
    }
}