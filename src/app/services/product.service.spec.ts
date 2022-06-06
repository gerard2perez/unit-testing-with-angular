import { TestBed } from "@angular/core/testing";
import { ProductsService } from "./product.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { Product } from "../models/product.model";
import { environment } from '../../environments/environment'
fdescribe('ProductsService', ()=>{
  let productsService: ProductsService
  let httpController: HttpTestingController
  beforeEach(()=>{
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        ProductsService
      ]
    })
    productsService = TestBed.inject(ProductsService)
    httpController = TestBed.inject(HttpTestingController)
  })

  it('should be created', ()=>{
    expect(productsService).toBeTruthy()
  })
  describe('test for getAllSimple', ()=>{
    it('should return a product list', (done)=>{
      //Arrange
      const mockData:Product[] = [
        {
          id: '1',
          title: 'title',
          price: 12,
          description: 'bla',
          category: {
            id: 1,
            name: 'category'
          },
          images: ['img', 'img'],
        }
      ]
      // Act
      productsService.getAllSimple()
        .subscribe(products => {
          //Assert
          expect(products).toEqual(mockData)
          done()
        })
      // http congif
      const url = `${environment.API_URL}/api/v1/products`
      const req = httpController.expectOne(url)
      req.flush(mockData)
      httpController.verify()
    })
  })

})
