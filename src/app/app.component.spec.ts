import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { queryAllByDirective, RouterLinkDirectiveStub } from 'src/testing';
import { AppComponent } from './app.component';
@Component({selector: 'app-banner'})
class HeaderComponentStub {}
@Component({selector: 'app-footer'})
class FooterComponentStub {}
describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>
  let component: AppComponent
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        HeaderComponentStub,
        FooterComponentStub,
        AppComponent,
        RouterLinkDirectiveStub
      ],
      // schemas: [
      //   NO_ERRORS_SCHEMA
      // ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance
    fixture.detectChanges()
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
  it('creates 7 routerLinks', ()=>{
    const links = queryAllByDirective(fixture, RouterLinkDirectiveStub)

    expect(links.length).toBe(7)
  })

  it('creates 7 routerLinks witch correct routes', ()=>{
    const links = queryAllByDirective(fixture, RouterLinkDirectiveStub)
    const routerLinks = links.map(link => link.injector.get(RouterLinkDirectiveStub))

    expect(links.length).toBe(7)
    expect(routerLinks[0].linkParams).toEqual('/')
    expect(routerLinks[1].linkParams).toEqual('/auth/register')
    expect(routerLinks[2].linkParams).toEqual('/products')
    expect(routerLinks[3].linkParams).toEqual('/people')
    expect(routerLinks[4].linkParams).toEqual('/others')
    expect(routerLinks[5].linkParams).toEqual('/pico-preview')
    expect(routerLinks[6].linkParams).toEqual('/auth/login')
  })
  // it(`should have as title 'ng-testing-services'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('ng-testing-services');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('ng-testing-services app is running!');
  // });
});
