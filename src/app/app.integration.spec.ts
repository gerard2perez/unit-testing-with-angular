import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router, RouterLink } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { clickElement, clickEvent, query, queryAllByDirective, RouterLinkDirectiveStub } from 'src/testing';
import { mockComponent } from 'src/testing';
import { AppComponent } from './app.component';
const picoComponent = mockComponent({selector: 'app-pico-preview'})
const peopleComponent = mockComponent({selector: 'app-people'})
const otherComponent = mockComponent({selector: 'app-others'})
const routes = [
  {
    path: 'pico-preview',
    component: picoComponent
  },
  {
    path: 'people',
    component: peopleComponent
  },
  {
    path: 'others',
    component: otherComponent
  },
]
describe('App integration test', ()=>{
  let fixture: ComponentFixture<AppComponent>
  let component: AppComponent
  let router: Router
  beforeEach(fakeAsync(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [
        picoComponent,
        otherComponent,
        peopleComponent,
        AppComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance
    router = TestBed.inject(Router)

    router.initialNavigation()
    tick()

    fixture.detectChanges()
  }));

  it('should create the app', ()=>{
    expect(component).toBeTruthy()
  })

  it('creates 7 routerLinks', ()=>{
    const links = queryAllByDirective(fixture, RouterLink)

    expect(links.length).toEqual(7)
  })

  it('should render OthersComponent', fakeAsync(() => {
    clickElement(fixture, 'others-link', true)

    tick()
    fixture.detectChanges()
    const othersComponent = query(fixture, 'app-others-component')

    expect(router.url).toEqual('/others')
    expect(othersComponent).toBeTruthy()

  }))

})
