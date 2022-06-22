import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, firstValueFrom, lastValueFrom, Observable, of, switchMap } from 'rxjs';

@Component({
    selector: 'register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

    formRegister: FormGroup

    constructor(private _builder: FormBuilder) { }

    ngOnInit(): void {

        this.formRegister = this._builder.group({
            name: ['', [Validators.required, Validators.minLength(4)]],
            username: ['', [Validators.required, Validators.minLength(4)]],
            email: ['', [Validators.required, Validators.minLength(4), Validators.email]],
            password: ['', [Validators.required, Validators.minLength(4)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(4)]]
        })

    }

    checkPasswordStrength() {
        const isStrong$ = this.formRegister.valueChanges
            .pipe(
                switchMap(input => {
                    const inputPassword = input.password as string
                    const patternPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/
                    return of(patternPassword.test(inputPassword))
                })
        )
        return lastValueFrom(isStrong$)
    }

    async onSubmit() {

        const formStatus$ = this.formRegister.statusChanges.subscribe(status => {
            if (status !== 'VALID') {
                if (this.formRegister.valid) {
                    const isStrong = this.checkPasswordStrength().then(
                        isStrong => {
                        if (isStrong) {
                            alert('Senha válida')
                        } else {
                            alert('Senha inválida')
                        }}
                    )
                }
            }
        })
        // if (this.formRegister.valid) {

            // const passwordMatchs = this.formRegister.value.password === this.formRegister.value.confirmPassword
            // if (!passwordMatchs) {
            //     throw new Error('Senhas não são iguais')
            // }
        // } else {
        //     alert('Preencha os campos obrigatórios')
        // }
    }


}
