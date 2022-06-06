import { TestBed } from "@angular/core/testing";
import { ProductsService } from "./product.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { CreateProductDTO, Product, UpdateProductDTO } from "../models/product.model";
import { environment } from '../../environments/environment'
import { generateManyProducts, generateOneProduct } from "../models/product.mock";
import { faker } from "@faker-js/faker";
import { HttpStatusCode } from "@angular/common/http";
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
  afterEach(()=>{
    httpController.verify()
  })
  it('should be created', ()=>{
    expect(productsService).toBeTruthy()
  })
  describe('test for getAllSimple', ()=>{
    it('should return a product list', (done)=>{
      //Arrange
      const mockData:Product[] = generateManyProducts(100)
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

    })
  })

  describe('test for getAll', ()=>{
    it('should return a product list', (done)=>{
      //Arrange
      const mockData:Product[] = generateManyProducts(1)
      // Act
      productsService.getAll()
        .subscribe(products => {
          //Assert
          expect(products.length).toEqual(mockData.length)
          done()
        })
      // http congif
      const url = `${environment.API_URL}/api/v1/products`
      const req = httpController.expectOne(url)
      req.flush(mockData)

    })
    it('return a list of products with taxes', (done) => {
      // Arrange
      const mockData: Product[] = [
        { ...generateOneProduct(), price: 100 },
        { ...generateOneProduct(), price: 200 },
        { ...generateOneProduct(), price: 0 },
        { ...generateOneProduct(), price: -300 }

      ]

      // Act
      productsService.getAll()
        .subscribe(products => {
          //Assert
          expect(products[0].taxes).toEqual(19)
          expect(products[1].taxes).toEqual(38)
          expect(products[2].taxes).toEqual(0)
          expect(products[3].taxes).toEqual(0)
          done()
        })
      // http config
      const url = `${environment.API_URL}/api/v1/products`
      const req = httpController.expectOne(url)
      req.flush(mockData)

    })
    it('sends query params with limit 10 and offset 3', (done) => {
      // Arrange
      const limit = faker.datatype.number({min: 10, max: 100})
      const mockData: Product[] = generateManyProducts(limit)
      const offset = faker.datatype.number({min: 0, max: 50});
      // Act
      productsService.getAll(limit, offset)
        .subscribe(products => {
          expect(products.length).toEqual(limit)
          done()
        })
      // http config
      const url = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`
      const req = httpController.expectOne(url)
      req.flush(mockData)
      const params = req.request.params;
      expect(params.get('limit')).toEqual(`${limit}`)
      expect(params.get('offset')).toEqual(`${offset}`)

    })
  })

  describe('test for create product', () => {
    it('should return a new product', (done)=>{
      // Arrange
      const mockData = generateOneProduct()
      const dto: CreateProductDTO = {
        ...mockData,
        categoryId: mockData.category.id
      }
      productsService.create({...dto})
        .subscribe(product => {
          expect(product).toEqual(mockData)
          done()
        })
      // http config
      const url = `${environment.API_URL}/api/v1/products`
      const req = httpController.expectOne(url)
      req.flush(mockData)
      expect(req.request.body).toEqual(dto)
      expect(req.request.method).toEqual('POST')

    })
  })
  describe('test for update product', () => {
    it('should update and existing product', (done)=>{
      // Arrange
      const mockData = generateOneProduct()
      const dto: UpdateProductDTO = {
        ...mockData,
        categoryId: mockData.category.id
      }
      productsService.update(mockData.id, {...dto})
        .subscribe(product => {
          expect(product).toEqual(mockData)
          done()
        })
      // http config
      const url = `${environment.API_URL}/api/v1/products/${mockData.id}`
      const req = httpController.expectOne(url)
      expect(req.request.body).toEqual(dto)
      expect(req.request.method).toEqual('PUT')
      req.flush(mockData)
    })
  })
  describe('test for delete product', () => {
    it('should return true when a product is deleted', (done)=>{
      // Arrange
      const mockData = generateOneProduct()
      productsService.delete(mockData.id)
        .subscribe(result => {
          expect(result).toBeTruthy()
          done()
        })
      // http config
      const url = `${environment.API_URL}/api/v1/products/${mockData.id}`
      const req = httpController.expectOne(url)
      req.flush(mockData)
      expect(req.request.body).toBeNull()
      expect(req.request.method).toEqual('DELETE')

    })
  })
  describe('test for getOne', () => {
    it('returns a product', (done)=>{
      // Arrange
      const mockData = generateOneProduct()
      const productId = `${mockData.id}`
      productsService.getOne(productId)
        .subscribe(product => {
          expect(product).toEqual(mockData)
          done()
        })
      // http config
      const url = `${environment.API_URL}/api/v1/products/${productId}`
      const req = httpController.expectOne(url)
      expect(req.request.method).toEqual('GET')
      req.flush(mockData)
    })
    it('returns the right message when status code is 404', (done)=>{
      // Arrange
      const productId = `1`
      const msgError = '404 message'
      const mockError = {
        status: HttpStatusCode.NotFound,
        statusText: msgError
      }
      productsService.getOne(productId)
        .subscribe({error: error => {
          expect(error).toEqual('El producto no existe')
          done()
        }})
      // http config
      const url = `${environment.API_URL}/api/v1/products/${productId}`
      const req = httpController.expectOne(url)
      expect(req.request.method).toEqual('GET')
      req.flush(msgError, mockError)
    })
    it('returns the right message when status code is 401', (done)=>{
      // Arrange
      const productId = `1`
      const msgError = '401 message'
      const mockError = {
        status: HttpStatusCode.Unauthorized,
        statusText: msgError
      }
      productsService.getOne(productId)
        .subscribe({error: error => {
          expect(error).toEqual('No estas permitido')
          done()
        }})
      // http config
      const url = `${environment.API_URL}/api/v1/products/${productId}`
      const req = httpController.expectOne(url)
      expect(req.request.method).toEqual('GET')
      req.flush(msgError, mockError)
    })
    it('returns the right message when status code is 409', (done)=>{
      // Arrange
      const productId = `1`
      const msgError = '409 message'
      const mockError = {
        status: HttpStatusCode.Conflict,
        statusText: msgError
      }
      // Act
      productsService.getOne(productId)
        .subscribe({error: error => {
          // Assert
          expect(error).toEqual('Algo esta fallando en el server')
          done()
        }})
      // http config
      const url = `${environment.API_URL}/api/v1/products/${productId}`
      const req = httpController.expectOne(url)
      expect(req.request.method).toEqual('GET')
      req.flush(msgError, mockError)
    })
    it('returns the right message when another error code is returned', (done)=>{
      // Arrange
      const productId = `1`
      const msgError = '500 message'
      const mockError = {
        status: HttpStatusCode.InternalServerError,
        statusText: msgError
      }
      // Act
      productsService.getOne(productId)
        .subscribe({error: error => {
          // Assert
          expect(error).toEqual('Ups algo salio mal')
          done()
        }})
      // http config
      const url = `${environment.API_URL}/api/v1/products/${productId}`
      const req = httpController.expectOne(url)
      expect(req.request.method).toEqual('GET')
      req.flush(msgError, mockError)
    })
  })
})
