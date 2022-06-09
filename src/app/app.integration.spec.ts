import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router, RouterLinkWithHref } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { clickElement, getText, mockObservable, query, queryAllByDirective } from 'src/testing';
import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { generateManyProducts } from './models/product.mock';
import { generateOneUser } from './models/user.mock';
import { AuthService } from './services/auth.service';
import { ProductsService } from './services/product.service';

describe('App integration test', ()=>{
  let fixture: ComponentFixture<AppComponent>
  let component: AppComponent
  let router: Router
  let productsService: jasmine.SpyObj<ProductsService>
  let authService: jasmine.SpyObj<AuthService>
  beforeEach(fakeAsync(async () => {
    const productsServiceSpy = jasmine.createSpyObj('ProductsService', ['getAll'])
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getUser'])
    await TestBed.configureTestingModule({
      imports: [
        AppModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        { provide: ProductsService, useValue: productsServiceSpy},
        { provide: AuthService, useValue: authServiceSpy}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance
    router = TestBed.inject(Router)
    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>

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

  it('should render OthersComponent when clicked with session', fakeAsync(() => {
    const productsMock = generateManyProducts(10)
    const userMock = generateOneUser()
    productsService.getAll.and.returnValue(mockObservable(productsMock))
    authService.getUser.and.returnValue(mockObservable(userMock))

    clickElement(fixture, 'others-link', true)

    tick()
    fixture.detectChanges()

    const othersComponent = query(fixture, 'app-others')
    const h1Text = getText(fixture, 'products-length')

    expect(h1Text).toContain(h1Text)
    expect(router.url).toEqual('/others')
    expect(othersComponent).toBeTruthy()

  }))

  it('should not render OthersComponent when clicked without session', fakeAsync(() => {
    authService.getUser.and.returnValue(mockObservable(null))

    clickElement(fixture, 'others-link', true)

    tick()
    fixture.detectChanges()

    expect(router.url).toEqual('/')

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
