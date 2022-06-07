import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { generateOnePerson } from 'src/app/models/person.mock';
import { Person } from 'src/app/models/person.model';

import { PersonComponent } from './person.component';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;
  let person = generateOnePerson()

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    component.person = person
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(`assigns a person with name '${person.name}'`, () => {
    const personDebug = fixture.debugElement
    const expectedMsg = `Hola, ${person.name}`
    const h3Debug = personDebug.query(By.css('h3'))
    const h3Element:HTMLElement = h3Debug.nativeElement

    expect(h3Element.textContent).toEqual(expectedMsg)
  })
  it('have a <h3> with "Hola, {person.name}"', ()=>{
    component.person = new Person('Gerardo', 'Perez', 32, 77, 1.78)
    const expectedMsg = `Hola, Gerardo`
    const personDebug: DebugElement = fixture.debugElement
    const h3Debug: DebugElement = personDebug.query(By.css('h3'))
    const h3Element = h3Debug.nativeElement

    fixture.detectChanges()

    expect(h3Element?.textContent).toEqual(expectedMsg)
  })
  it('have a <p> with "Mi altura es {person.height} m"', ()=>{
    component.person = new Person('Gerardo', 'Perez', 32, 77, 1.78)
    const expectedMsg = `Mi altura es 1.78 m`
    const personDebug: DebugElement = fixture.debugElement
    const pDebug: DebugElement = personDebug.query(By.css('p'))
    const pElement = pDebug.nativeElement

    fixture.detectChanges()

    expect(pElement?.textContent).toEqual(expectedMsg)
  })
  it('displays a text with IMC when do click', ()=>{
    component.person = new Person('Gerardo', 'Perez', 32, 77, 1.78)
    const expectedMsg = `IMC: normal`
    const personDebug: DebugElement = fixture.debugElement
    const buttonDebug: DebugElement = personDebug.query(By.css('button.btn-imc'))
    const buttonElement: HTMLButtonElement = buttonDebug.nativeElement

    buttonDebug.triggerEventHandler('click', null)
    fixture.detectChanges()

    expect(buttonElement?.textContent).toEqual(expectedMsg)
  })
  it('should raise selected event when do click', ()=>{
    let selectedPerson: Person | undefined
    const expectedPerson = new Person('Gerardo', 'Perez', 32, 77, 1.78)
    component.person = expectedPerson
    // const expectedMsg = `IMC: normal`
    const buttonDebug: DebugElement = fixture.debugElement.query(By.css('button.btn-choose'))
    const buttonElement: HTMLButtonElement = buttonDebug.nativeElement

    component.onSelected.subscribe(person=>{
      selectedPerson = person
    })
    buttonDebug.triggerEventHandler('click', null)
    fixture.detectChanges()

    expect(selectedPerson).toEqual(expectedPerson)
  })
});

@Component({
  template: '<app-person [person]=person (onSelected)="onSelected($event)"></app-person>'
})
class HostComponent {
  person = new Person('Gerardo', 'Perez', 32, 77, 1.78)
  selectedPerson: Person | undefined
  onSelected(person: Person) {
    this.selectedPerson = person
  }
}
describe('PersonComponent from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostComponent, PersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('display a person name', ()=>{
    // Arrage
    const expectedName = 'Gerardo'
    const personDebug = fixture.debugElement.query(By.css('app-person h3'))
    const h3Element = personDebug.nativeElement
    // Act
    fixture.detectChanges()
    // Assert
    expect(h3Element.textContent).toContain(expectedName)
  })
  it('raises selected event when clicked', ()=>{
    // Arrage
    const expectedName = 'Gerardo'
    const btnDebug = fixture.debugElement.query(By.css('app-person button.btn-choose'))
    // Act
    btnDebug.triggerEventHandler('click', null)
    fixture.detectChanges()
    // Assert
    expect(component.selectedPerson).toEqual(component.person)
  })
})
