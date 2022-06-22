import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  formLogin: FormGroup

  constructor(private _builder: FormBuilder) { }

  ngOnInit(): void {

    this.formLogin = this._builder.group({
      email: ['', [Validators.required, Validators.minLength(4), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      rememberMe: false
    })

  }

  onSubmit() {
    if (this.formLogin.valid) {
      const valores = this.formLogin.value
      console.log(valores);      
    }
  }

}
