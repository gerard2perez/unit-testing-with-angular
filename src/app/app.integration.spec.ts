import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router, RouterLink, RouterLinkWithHref } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { asyncData, clickElement, clickEvent, getText, mockObservable, query, queryAllByDirective, RouterLinkDirectiveStub } from 'src/testing';
import { mockComponent } from 'src/testing';
import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { generateManyProducts } from './models/product.mock';
import { ProductsService } from './services/product.service';

fdescribe('App integration test', ()=>{
  let fixture: ComponentFixture<AppComponent>
  let component: AppComponent
  let router: Router
  let productsService: jasmine.SpyObj<ProductsService>
  beforeEach(fakeAsync(async () => {
    const productsServiceSpy = jasmine.createSpyObj('ProductsService', ['getAll'])
    await TestBed.configureTestingModule({
      imports: [
        AppModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        { provide: ProductsService, useValue: productsServiceSpy}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance
    router = TestBed.inject(Router)
    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>

    router.initialNavigation()
    tick()

    fixture.detectChanges()
  }));

  it('should create the app', ()=>{
    expect(component).toBeTruthy()
  })

  it('creates 7 routerLinks', ()=>{
    const links = queryAllByDirective(fixture, RouterLinkWithHref)

    expect(links.length).toEqual(7)
  })

  it('should render OthersComponent when clicked', fakeAsync(() => {
    const productsMock = generateManyProducts(10)
    productsService.getAll.and.returnValue(asyncData(productsMock))

    clickElement(fixture, 'others-link', true)

    tick()
    fixture.detectChanges()

    tick()
    fixture.detectChanges()

    const othersComponent = query(fixture, 'app-others')
    const h1Text = getText(fixture, 'products-length')

    expect(h1Text).toContain(h1Text)
    expect(router.url).toEqual('/others')
    expect(othersComponent).toBeTruthy()

  }))

  it('should render PeopleComponent', fakeAsync(() => {
    clickElement(fixture, 'people-link', true)

    tick()
    fixture.detectChanges()
    const peopleComponent = query(fixture, 'app-people')

    expect(router.url).toEqual('/people')
    expect(peopleComponent).toBeTruthy()

  }))

})
