import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { fakeActivatedRouteSnapshot, fakeRouterStateSnapshot, mockObservable } from "src/testing";
import { generateOneUser } from "../models/user.mock";
import { AuthService } from "../services/auth.service";
import { TokenService } from "../services/token.service";
import { AuthGuard } from "./auth.guard";

describe('Tests for AuthGuard', () => {
  let guard: AuthGuard;
  let tokenService: jasmine.SpyObj<TokenService>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const tokenServiceSpy = jasmine.createSpyObj('TokenService', ['getToken']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getUser']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: TokenService, useValue: tokenServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ]
    });
    guard = TestBed.inject(AuthGuard);
    tokenService = TestBed.inject(TokenService) as jasmine.SpyObj<TokenService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be create', () => {
    expect(guard).toBeTruthy();
  });

  it('return true with session', (done)=>{
    const userMock = generateOneUser()
    authService.getUser.and.returnValue(mockObservable(userMock))
    const activatedRoute = fakeActivatedRouteSnapshot({})
    const routerState = fakeRouterStateSnapshot({})

    guard.canActivate(activatedRoute, routerState)
      .subscribe( res => {
        expect(res).toBeTruthy()
        done()
      })
  })
  it('return false without session', (done)=>{
    authService.getUser.and.returnValue(mockObservable(null))
    const activatedRoute = fakeActivatedRouteSnapshot({})
    const routerState = fakeRouterStateSnapshot({})

    guard.canActivate(activatedRoute, routerState)
      .subscribe( res => {
        expect(res).toBeFalsy()
        expect(router.navigate).toHaveBeenCalledWith(['/'])
        done()
      })
  })

});
