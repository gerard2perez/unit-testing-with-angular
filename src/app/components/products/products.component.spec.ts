import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { defer, of } from 'rxjs';
import { generateManyProducts } from 'src/app/models/product.mock';
import { ProductsService } from 'src/app/services/product.service';
import { ProductComponent } from '../product/product.component';
import { ProductsComponent } from './products.component';

fdescribe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductsService>
  const productsMock = generateManyProducts(2)

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductsService', ['getAll'])
    productServiceSpy.getAll.and.returnValue(of(productsMock))
    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent, ProductComponent ],
      providers: [
        { provide: ProductsService, useValue: productServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    productService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
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
      productService.getAll.and.returnValue(defer(()=>Promise.resolve(productsMock)))
      // Act
      component.getAllProducts()
      fixture.detectChanges()

      expect(component.status).toEqual('loading')

      tick();
      fixture.detectChanges()
      // Assert
      expect(component.status).toEqual('success')
    }))
    it('changes status from "loading" => "error"', fakeAsync(() => {
      // Arrange
      const productsMock = generateManyProducts(10)
      productService.getAll.and.returnValue(defer(()=>Promise.reject("error")))
      // Act
      component.getAllProducts()
      fixture.detectChanges()

      expect(component.status).toEqual('loading')

      tick(4000);
      fixture.detectChanges()
      // Assert
      expect(component.status).toEqual('error')
    }))
  })
});
