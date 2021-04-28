import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import jsSHA from 'jssha';
import { user } from 'src/app/model/user';
import { ApiService } from 'src/app/services/api.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-newaccount',
  templateUrl: './newaccount.page.html',
  styleUrls: ['./newaccount.page.scss'],
})
export class NewaccountPage implements OnInit {
  public registroForm: FormGroup;
  public data: user;

  erroresForm = {
    'name': '',
    'email': '',
    'password': ''
  }

  constructor(private formBuilder: FormBuilder,
    private ui: UiService,
    private api: ApiService,
    private router: Router,
    private menu: MenuController) {
  }

  //_____________________________________________________
  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      'name': ['', [
        Validators.required,
        ]],
      'email': ['', [
        Validators.required,
        Validators.email]],
      'password': ['', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6)]]
    });
    this.registroForm.valueChanges.subscribe(data =>
      this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.registroForm) { return; }
    const form = this.registroForm;
    for (const field in this.erroresForm) {
      this.erroresForm[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.mensajesValidacion[field];
        for (const key in control.errors) {
          this.erroresForm[field] += messages[key] + ' ';
        }
      }
    }
  }

  mensajesValidacion = {
    'name': {
      'required': 'Nombre obligatorio',
    },
    'email': {
      'required': 'Email obligatorio',
      'email': 'Introduzca una dirección email correcta'
    },
    'password': {
      'required': 'Contraseña obligatoria',
      'pattern': 'La contraseña debe tener al menos una letra un número ',
      'minlength': 'y más de 6 caracteres'
    }
  }

  //______________________________________________
  
  public async sendForm() {
    await this.ui.showLoading();
    let shaObj = new jsSHA("SHA-256", "TEXT");
    shaObj.update(this.registroForm.get('password').value);
    let hash = shaObj.getHash("HEX");
    let email = this.registroForm.get('email').value;
    this.api.searchEmail(email).then(result => {
      if (result.email == email) {
        this.registroForm.setValue({
          name: '',
          email: '',
          password: ''
        })
        this.ui.hideLoading();
        this.ui.showToast("La cuenta ya está creada", "danger");
      } else {
        this.data = {
          name: this.registroForm.get('name').value,
          email: email,
          password: hash,
          avatar: "photo"
        }
        this.api.createUser(this.data).then((respuesta) => {
          this.registroForm.setValue({
            name: '',
            email: '',
            password: ''
          })
          this.ui.hideLoading();
          this.ui.showToast("Cuenta creada con éxito", "success");
          this.router.navigate(['/login'])
        }).catch((err) => {
        });
      }
    }).catch((err) => {
    })

  }

  /*
  //______________OCULTAR MENU
  ionViewDidEnter(): void {
    this.menu.enable(false);
  }
  
  ionViewDidLeave(): void {
    this.menu.enable(true);
  }
  //______________OCULTAR MENU
  */

  
}