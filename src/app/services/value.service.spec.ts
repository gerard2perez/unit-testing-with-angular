import { TestBed } from '@angular/core/testing';

import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValueService);
  });

  it('created', ()=>{
    expect(service).toBeTruthy()
  })
  describe('test for getValue', ()=>{
    it('should return my value', ()=>{
      expect(service.getValue()).toBe('my value')
    })
  })
  describe('test for setValue', ()=>{
    it('should change my value', ()=>{
      expect(service.getValue()).toBe('my value')
      service.setValue('change')
      expect(service.getValue()).toBe('change')
    })
  })
  describe('test for getPromiseValue', ()=>{
    it('should "promise value" from promise', (done)=>{
      service.getPromiseValue().then(value=>{
        expect(value).toBe('promise value')
        done()
      })

    })
    it('should "promise value" from promise (asyn)', async ()=>{
      const value = await service.getPromiseValue()
      expect(value).toBe('promise value')
    })
    it('should "observable value" from obsevable', (done)=>{
      service.getObservablevalue().subscribe(value=>{
        expect(value).toBe('observable value')
        done()
      })

    })
  })
});
