import { Injectable } from '@angular/core';
import { of } from 'rxjs';

export class FakeValueService {
  getValue() {
    return 'fake value'
  }
  setValue(value: string) { }
  getPromiseValue() {
    return Promise.resolve('fake promise value')
  }
  getObservablevalue() {
    return of('fake observable value')
  }
}
