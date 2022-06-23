import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GetbehaviorService {

    input: BehaviorSubject<any> = new BehaviorSubject(null)

    constructor() { }

    setBehavior(value: any) {
        this.input.next(value)
    }

    getBehavior() {
        return this.input.asObservable()
    }
}
