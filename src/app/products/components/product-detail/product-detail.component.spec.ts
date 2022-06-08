import { Location } from '@angular/common';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { generateOneProduct } from 'src/app/models/product.mock';
import { generateOneUser } from 'src/app/models/user.mock';
import { ProductsService } from 'src/app/services/product.service';
import { ActivatedRouteStub, asyncData, getAttribute, getText, mockObservable } from 'src/testing';

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
  });

  it('should create', () => {
    const productId = '1'
    route.setParamMap({id: productId})

    const productMock = {
      ...generateOneProduct(),
      id: productId
    }
    productService.getOne.and.returnValue(mockObservable(productMock))

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('shows the product in the UI', () => {
    const productId = '2'
    route.setParamMap({id: productId})

    const productMock = {
      ...generateOneProduct(),
      id: productId
    }
    productService.getOne.and.returnValue(mockObservable(productMock))

    fixture.detectChanges();

    const titleText = getText(fixture, 'title')
    const priceText = getText(fixture, 'price')
    const descriptionText = getText(fixture, 'description')
    const srtAttrText = getAttribute(fixture, 'img', 'src')

    expect(productService.getOne).toHaveBeenCalledWith(productId)
    expect(titleText).toEqual(productMock.title)
    expect(priceText).toContain(productMock.price)
    expect(descriptionText).toEqual(productMock.description)
    expect(srtAttrText).toEqual(productMock.images[0])
  });

  it('navigates back without id params', () => {
    route.setParamMap({})
    location.back.and.callThrough()

    fixture.detectChanges();

    expect(location.back).toHaveBeenCalled()
  });

  it('changes status from "loading" => "success"', fakeAsync(() => {
    const productId = '2'
    route.setParamMap({id: productId})

    const productMock = {
      ...generateOneProduct(),
      id: productId
    }
    productService.getOne.and.returnValue(asyncData(productMock))

    fixture.detectChanges();
    expect(component.status).toEqual('loading')

    tick()
    fixture.detectChanges();

    expect(productService.getOne).toHaveBeenCalledWith(productId)
    expect(component.status).toEqual('success')
  }));

  it('displays the value from "customer"', () => {
    const productId = '2'
    route.setParamMap({id: productId})
    route.setQueryParamMap({type: 'customer'})
    const productMock = {
      ...generateOneProduct(),
      id: productId
    }
    productService.getOne.and.returnValue(mockObservable(productMock))

    fixture.detectChanges();

    const typeText = getText(fixture, 'type')
    expect(typeText).toContain('customer')
  });
});

