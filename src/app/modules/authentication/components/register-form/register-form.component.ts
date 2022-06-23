import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GetbehaviorService } from '../input-validate/getbehavior.service';
@Component({
    selector: 'register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

    @ViewChild('inputName') inputName: ElementRef
    @ViewChild('validateName', { static: false }) validateName: ElementRef

    @ViewChild('inputUsername') inputUsername: ElementRef
    @ViewChild('validateUsername', { static: false }) validateUsername: ElementRef

    @ViewChild('inputEmail') inputEmail: ElementRef
    @ViewChild('validateEmail', { static: false }) validateEmail: ElementRef

    formRegister: FormGroup

    constructor(private _builder: FormBuilder,
        private _renderer: Renderer2,
        private _behaviorService: GetbehaviorService
    ) { }

    ngOnInit(): void {
        this.formRegister = this._builder.group({
            name: ['', [Validators.required, Validators.minLength(4)]],
            username: ['', [Validators.required, Validators.minLength(4)]],
            email: ['', [Validators.required, Validators.minLength(4), Validators.email]],
            password: [''],
            confirmPassword: ['']
        })
    }

    onSubmit() {
        console.log(this.formRegister.controls);

        // const required = this.formRegister.controls['name'].hasError('required')
        // const min = this.formRegister.controls['name'].hasError('minlength')
        // console.log(`required = ${required}`)
        // console.log(`minLen = ${min}`)
    }

    cliquei() {
        console.log('sai do input');

    }

    validaCampos(formControlName: string, templateRef: string) {
        if (templateRef == 'inputName') {
            const required = this.formRegister.controls[formControlName].hasError('required')
            const minlength = this.formRegister.controls[formControlName].hasError('minlength')
            if (required) {
                this.removeErrorMessage(this.inputName)
                this.setErrorMessage('Name is required', this.inputName, this.validateName)
                return
            }
            if (minlength) {
                this.removeErrorMessage(this.inputName)
                this.setErrorMessage('Minimum size 4 characters', this.inputName, this.validateName)
                return
            }
            this.removeErrorMessage(this.inputName)
            return
        }
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

    private setErrorMessage(message: string, input: ElementRef, parentNode: ElementRef) {

        if (document.querySelector('#message-error')) {
            return
        }

        const newElement = this._renderer.createElement('div')
        const text = this._renderer.createText(message)

        this._renderer.addClass(newElement, 'invalid-feedback')
        this._renderer.setStyle(newElement, 'display', 'block')
        this._renderer.setAttribute(newElement, 'id', 'message-error')

        this._renderer.appendChild(newElement, text)

        this._renderer.addClass(input.nativeElement, 'is-invalid')
        this._renderer.appendChild(parentNode.nativeElement, newElement)
    }

    private removeErrorMessage(input: ElementRef) {
        const oldElement = document.querySelector('#message-error')
        this._renderer.removeClass(input.nativeElement, 'is-invalid')
        oldElement?.remove()
    }
}
