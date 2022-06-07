import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { generateManyPeople } from 'src/app/models/person.mock';
import { PersonComponent } from '../person/person.component';

import { PeopleComponent } from './people.component';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleComponent, PersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('shows a list of app-person', () => {
    // Ararnge
    component.people = generateManyPeople(12)
    // Act
    fixture.detectChanges()
    const debugElement = fixture.debugElement.queryAll(By.css('app-person'))
    // Assert
    expect(debugElement.length).toEqual(component.people.length)

  })
  it('renders the selected person', () => {
    // Ararnge
    const personIndex = 0
    component.people = generateManyPeople(12)
    // Act
    fixture.detectChanges()
    const selectDebug = fixture.debugElement.queryAll(By.css('app-person button.btn-choose'))[personIndex]
    selectDebug.triggerEventHandler('click', null)
    fixture.detectChanges()
    const liNameDebug = fixture.debugElement.query(By.css('article ul li:nth-child(1)'))
    const liAgeDebug = fixture.debugElement.query(By.css('article ul li:nth-child(2)'))
    // Assert
    expect(liNameDebug.nativeElement.textContent).toEqual(`Name: ${component.people[personIndex].name}`)
    expect(liAgeDebug.nativeElement.textContent).toEqual(`Age: ${component.people[personIndex].age}`)

  })
});
