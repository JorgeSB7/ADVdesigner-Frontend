import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from 'src/app/model/user';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UiService } from 'src/app/services/ui.service';
import jsSHA from 'jssha';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public task: FormGroup;
  public data: user;
  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    private authS: AuthService, 
    private ui: UiService,
    private router: Router,
    private menu: MenuController) { 
      this.task = this.formBuilder.group({
      email: ['', Validators.required],
      pass: ['', Validators.required]
    })}

  ngOnInit() {
    if (this.authS.isLogged() && this.authS.getUser().id != null) {
      this.router.navigate(['/'])
    }
  }
  
  public async sendForm() {
    await this.ui.showLoading();
    let shaObj = new jsSHA("SHA-256", "TEXT");
    shaObj.update(this.task.get('pass').value);
    let hash = shaObj.getHash("HEX");
    let email=this.task.get('email').value;
    this.api.searchCredentials(email,hash).then((respuesta) => {
        this.authS.login(respuesta).then(result=>{
        if (result.id != null) {
          this.ui.hideLoading();
          this.router.navigate(['/'])
        }else{
          this.ui.hideLoading();
          this.ui.showToast("El correo o la contraseña son incorrectos", "danger");
        }
      }).catch((err) => {
        console.log(err)
      });
      
      this.task.setValue({
        email: '',
        pass: ''
      })
    }).catch((err) => {
      console.log(err)
    });
  }


}