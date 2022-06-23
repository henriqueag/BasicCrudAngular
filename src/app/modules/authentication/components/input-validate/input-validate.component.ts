import { Component, Input, ViewChild, ElementRef, Renderer2, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'input-validate',
    templateUrl: './input-validate.component.html',
    styleUrls: ['./input-validate.component.css']
})
export class InputValidateComponent {

    @ViewChild('genericInput') genericInput: ElementRef
    @ViewChild('validateFieldContainer') validateFieldContainer: ElementRef

    @Input() type: string
    @Input() label: string
    @Input() htmlId: string
    @Input() htmlClass: string
    @Input() placeholder: string
    @Input() controlName: string

    constructor(private _renderer: Renderer2) { }

    ngOnInit() { }

    validateFields() {
        // const required = this.formGroup.controls[this.controlName].hasError('required')
        // const minlength = this.formGroup.controls[this.controlName].hasError('minlength')

        // console.log(this.formGroup.controls);

        // if (required) {
        //     this.removeErrorMessage(this.genericInput)
        //     this.setErrorMessage(`${this.label} is required`, this.genericInput, this.validateFieldContainer)
        //     return
        // }
        // if (minlength) {
        //     this.removeErrorMessage(this.genericInput)
        //     this.setErrorMessage('Minimum size 4 characters', this.genericInput, this.validateFieldContainer)
        //     return
        // }
        // this.removeErrorMessage(this.genericInput)
        //     return
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
