import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { defer, of } from 'rxjs';
import { generateManyProducts } from 'src/app/models/product.mock';
import { ProductsService } from 'src/app/services/product.service';
import { ValueService } from 'src/app/services/value.service';
import { ProductComponent } from '../product/product.component';
import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductsService>
  let valueService: jasmine.SpyObj<ValueService>
  const productsMock = generateManyProducts(2)

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductsService', ['getAll'])
    const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getPromiseValue'])
    productServiceSpy.getAll.and.returnValue(of(productsMock))
    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent, ProductComponent ],
      providers: [
        { provide: ProductsService, useValue: productServiceSpy },
        { provide: ValueService, useValue: valueServiceSpy },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    productService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    valueService = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(productService.getAll).toHaveBeenCalledTimes(1)
  });

  describe('test for getAllProducts', ()=>{
    it('renders the right amount of elements returned from getAll', ()=>{
      const appProductDebug = fixture.debugElement.queryAll(By.css('app-product'))

      expect(appProductDebug.length).toEqual(productsMock.length)
    })
    it('changes status from "loading" => "success"', fakeAsync(() => {
      // Arrange
      const productsMock = generateManyProducts(10)
      const btnDebug = fixture.debugElement.query(By.css('[data-test=btn-loading]'))
      productService.getAll.and.returnValue(defer(()=>Promise.resolve(productsMock)))
      // Act
      btnDebug.triggerEventHandler('click', null)
      fixture.detectChanges()
      // Assert
      expect(component.status).toEqual('loading')

      // Act
      tick()
      fixture.detectChanges()
      // Assert
      expect(component.status).toEqual('success')
    }))
    it('changes status from "loading" => "error"', fakeAsync(() => {
      // Arrange
      const productsMock = generateManyProducts(10)
      const btnDebug = fixture.debugElement.query(By.css('[data-test=btn-loading]'))
      productService.getAll.and.returnValue(defer(()=>Promise.reject("error")))
      // Act
      btnDebug.triggerEventHandler('click', null)
      fixture.detectChanges()

      expect(component.status).toEqual('loading')


      tick(4000);
      fixture.detectChanges()
      // Assert
      expect(component.status).toEqual('error')
    }))
  })
  describe('test for callPromise',  ()=>{
    it('calls a promise', async () => {
      const mockMessage = 'mock string'
      valueService.getPromiseValue.and.returnValue(Promise.resolve(mockMessage))

      await component.callPromise()
      fixture.detectChanges()

      expect(component.rta).toEqual(mockMessage)
      expect(valueService.getPromiseValue).toHaveBeenCalledTimes(1)
    })
    it('shows "mock string" in <p> when btn was clicked', fakeAsync( () => {
      const mockMessage = 'mock string'
      valueService.getPromiseValue.and.returnValue(Promise.resolve(mockMessage))
      const btnDebug = fixture.debugElement.query(By.css('.btn-promise'))
      const rtaDebug = fixture.debugElement.query(By.css('.rta'))

      btnDebug.triggerEventHandler('click', null)
      tick()
      fixture.detectChanges()

      expect(rtaDebug.nativeElement.textContent).toEqual(mockMessage)
      expect(valueService.getPromiseValue).toHaveBeenCalledTimes(1)
    }))
  })
});
