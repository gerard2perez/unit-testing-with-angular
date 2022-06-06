import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { generateManyProducts } from 'src/app/models/product.mock';
import { ProductsService } from 'src/app/services/product.service';

import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductsService>

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ProductsService', ['getAllSimple'])
    spy.getAllSimple.and.returnValue(of(generateManyProducts(2)))
    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent ],
      providers: [
        {provide: ProductsService, useValue: spy}
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
  });
});
