import { Component, Input, ViewChild, ElementRef, Renderer2, EventEmitter, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const INPUT_FIELD_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputValidateComponent),
    multi: true
};

@Component({
    selector: 'input-validate',
    templateUrl: './input-validate.component.html',
    styleUrls: ['./input-validate.component.css'],
    providers: [INPUT_FIELD_VALUE_ACCESSOR]
})
export class InputValidateComponent implements ControlValueAccessor {

    @ViewChild('genericInput') genericInput: ElementRef
    @ViewChild('validateFieldContainer') validateFieldContainer: ElementRef

    @Input() type: string
    @Input() label: string
    @Input() htmlId: string
    @Input() htmlClass: string
    @Input() placeholder: string
    @Input() cssLabelClass: string
    @Input() isDisabled: boolean

    constructor(private _renderer: Renderer2) { }

    private _innerValue: any;

    get value() {
        return this._innerValue;
    }

    set value(value: any) {
        if (value !== this._innerValue) {
            this._innerValue = value;
            this.onChangeCb(value);
        }
    }

    onChangeCb: (_: any) => void = () => { };
    onTouchedCb: (_: any) => void = () => { };

    writeValue(value: any) {
        this.value = value
    }
    registerOnChange(fn: any) {
        this.onChangeCb = fn
    }
    registerOnTouched(fn: any) {
        this.onTouchedCb = fn
    }

    setDisabledState?(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

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
