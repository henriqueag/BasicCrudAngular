import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

    onSubmit() {
        console.log(this.formRegister.controls['email'].errors)
    }

    private checkPasswordStrength(password: string) {
        const uppercase = /([A-Z]+){1,}/g
        const lowercase = /([a-z]+){1,}/g
        const number = /([0-9]+){1,}/g
        const specialCharacter = /([!@#$%^&*]){1,}/g
        const length = password.length >= 8

        if (!uppercase.test(password))
            return false
        if (!lowercase.test(password))
            return false
        if (!number.test(password))
            return false
        if (!specialCharacter.test(password))
            return false
        if (!length)
            return false

        return true
    }
}
