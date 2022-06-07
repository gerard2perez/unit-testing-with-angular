import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PersonComponent } from './person.component';

fdescribe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('have a <p> with "soy un parrafo"', ()=>{
    const personDebug: DebugElement = fixture.debugElement
    const pDebug: DebugElement = personDebug.query(By.css('p'))
    const pElement = pDebug.nativeElement

    expect(pElement?.textContent).toEqual('Soy un parrafo')
  })
  it('have a <h3> with "Hola, PersonComponent"', ()=>{
    const personDebug: DebugElement = fixture.debugElement
    const h3Debug: DebugElement = personDebug.query(By.css('h3'))
    const h3Element = h3Debug.nativeElement

    expect(h3Element?.textContent).toEqual('Hola, PersonComponent')
  })
});
