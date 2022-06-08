import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { generateOneProduct } from 'src/app/models/product.mock';
import { generateOneUser } from 'src/app/models/user.mock';
import { ProductsService } from 'src/app/services/product.service';
import { ActivatedRouteStub, mockObservable } from 'src/testing';

import { ProductDetailComponent } from './product-detail.component';

fdescribe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let route: ActivatedRouteStub
  let productService: jasmine.SpyObj<ProductsService>
  let location: jasmine.SpyObj<Location>

  beforeEach(async () => {
    const routeStub = new ActivatedRouteStub()
    const productServiceSpy = jasmine.createSpyObj('ProductsService', ['getOne'])
    const locationSpy = jasmine.createSpyObj('Location', ['back'])
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailComponent ],
      providers: [
        { provide: Location, useValue: locationSpy },
        { provide: ActivatedRoute, useValue: routeStub },
        { provide: ProductsService, useValue: productServiceSpy },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub
    productService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>
    location = TestBed.inject(Location) as jasmine.SpyObj<Location>

    const productId = '1'
    route.setParamMap({id: productId})

    const productMock = {
      ...generateOneProduct(),
      id: productId
    }
    productService.getOne.and.returnValue(mockObservable(productMock))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
