import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { CreateProductDTO, Product, UpdateProductDTO } from "../models/product.model";
import { environment } from '../../environments/environment'
import { generateManyProducts, generateOneProduct } from "../models/product.mock";
import { faker } from "@faker-js/faker";
import { HttpStatusCode, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptor } from "../interceptors/token.interceptor";
import { TokenService } from "./token.service";
import { AuthService } from "./auth.service";
import { Auth } from "../models/auth.model";

fdescribe('AuthService', ()=>{
  let authService: AuthService
  let httpController: HttpTestingController
  let tokenService: TokenService
  beforeEach(()=>{
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        AuthService,
        TokenService,
        // { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
      ]
    })
    authService = TestBed.inject(AuthService)
    httpController = TestBed.inject(HttpTestingController)
    tokenService = TestBed.inject(TokenService)
  })
  afterEach(()=>{
    httpController.verify()
  })
  it('should be created', ()=>{
    expect(authService).toBeTruthy()
  })
  describe('test for login', () => {
    it('returns a token', (done) => {
      //Arrange
      const mockData:Auth = { access_token: faker.datatype.uuid() }
      const email = faker.internet.email()
      const password = faker.internet.password()
      // Act
      authService.login(email, password)
        .subscribe(token => {
          console.log('a')
          //Assert
          expect(token).toEqual(mockData)
          done()
        })
      // http congif
      const url = `${environment.API_URL}/api/v1/auth/login`
      const req = httpController.expectOne(url)
      expect(req.request.method).toEqual('POST')
      req.flush(mockData)
    })
    it('calls saveToken', (done) => {
      //Arrange
      const mockData:Auth = { access_token: faker.datatype.uuid() }
      const email = faker.internet.email()
      const password = faker.internet.password()
      spyOn(tokenService, 'saveToken').and.callThrough()
      // Act
      authService.login(email, password)
        .subscribe(token => {
          //Assert
          expect(token).toEqual(mockData)
          expect(tokenService.saveToken).toHaveBeenCalledTimes(1)
          expect(tokenService.saveToken).toHaveBeenCalledOnceWith(mockData.access_token)
          done()
        })
      // http congif
      const url = `${environment.API_URL}/api/v1/auth/login`
      const req = httpController.expectOne(url)
      expect(req.request.method).toEqual('POST')
      req.flush(mockData)
    })
  })
});
