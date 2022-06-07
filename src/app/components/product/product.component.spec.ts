import { ComponentFixture, TestBed } from '@angular/core/testing';
import { generateOneProduct } from 'src/app/models/product.mock';
import { ReversePipe } from 'src/app/pipes/reverse.pipe';

import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    component.product = generateOneProduct()
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
