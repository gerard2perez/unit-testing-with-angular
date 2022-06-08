import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { generateOneUser } from 'src/app/models/user.mock';
import { UsersService } from 'src/app/services/user.service';
import { asyncData, asyncError, clickElement, getText, mockObservable, query, queryById, setCheckBoxValue, setInputValue } from 'src/testing';

import { RegisterFormComponent } from './register-form.component';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let userService: jasmine.SpyObj<UsersService>
  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserService', ['create'])
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ RegisterFormComponent ],
      providers:[
        {provide: UsersService, useValue: spy}
      ]
    })
    .compileComponents();
    userService = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('makes emailField is invalid', ()=> {
    component.emailField?.setValue('Esto no es un chorro')
    expect(component.emailField?.invalid).withContext('wrong email').toBeTruthy()

    component.emailField?.setValue('')
    expect(component.emailField?.invalid).withContext('empty email').toBeTruthy()
  })

  it('sets passwordField status as invalid', ()=> {
    component.passwordField?.setValue('')
    expect(component.passwordField?.invalid).withContext('required').toBeTruthy()

    component.passwordField?.setValue('12345')
    expect(component.passwordField?.invalid).withContext('12345').toBeTruthy()

    component.passwordField?.setValue('aHSashASHaskAJS')
    expect(component.passwordField?.invalid).withContext('whith out numbers').toBeTruthy()

    component.passwordField?.setValue('aHSashAS2HaskAJS')
    expect(component.passwordField?.valid).withContext('correct').toBeTruthy()
  })
  it('marks the form as valid', ()=>{
    component.form.patchValue({
      name: 'gera',
      email: 'gera@gera.com',
      password: '123123123',
      confirmPassword: '123123123',
      checkTerms: false
    })
    expect(component.form.invalid).toBeTruthy()
  })

  it('makes emailField invalid filling from UI', ()=> {
    const inputDe = query(fixture, 'input#email')
    const inputEl : HTMLInputElement = inputDe.nativeElement

    setInputValue(fixture, 'input#email', 'esto no es un correo')
    fixture.detectChanges()

    expect(component.emailField?.invalid).withContext('wrong email').toBeTruthy()

    const emailErrorMsg = getText(fixture, 'emailField-email')
    expect(emailErrorMsg).toEqual("*It's not a email")
  })

  it('send the form data', ()=>{
    const mockUser = generateOneUser()
    userService.create.and.returnValue(mockObservable(mockUser))
    component.form.patchValue({
      name: 'gera',
      email: 'gera@gera.com',
      password: '123123123',
      confirmPassword: '123123123',
      checkTerms: true
    })

    clickElement(fixture, '[type=submit]')
    // fixture.detectChanges()

    expect(component.form.valid).toBeTruthy()
    expect(userService.create).toHaveBeenCalledTimes(1)
  })
  it('correctly updates the status "loading" => "success"', fakeAsync(()=>{
    const mockUser = generateOneUser()
    userService.create.and.returnValue(asyncData(mockUser))
    component.form.patchValue({
      name: 'gera',
      email: 'gera@gera.com',
      password: '123123123',
      confirmPassword: '123123123',
      checkTerms: true
    })
    clickElement(fixture, '[type=submit]')

    expect(component.status).toEqual('loading')

    tick()
    fixture.detectChanges()

    expect(component.status).toEqual('success')
    expect(component.form.valid).toBeTruthy()
    expect(userService.create).toHaveBeenCalledTimes(1)
  }))


  it('fill inputs from UI and send data also changes status from "loading" => "success"', fakeAsync(()=>{
    const mockUser = generateOneUser()
    userService.create.and.returnValue(asyncData(mockUser))

    setInputValue(fixture, 'input#name', 'Gerardo')
    setInputValue(fixture, 'input#email', 'gera@gera.com')
    setInputValue(fixture, 'input#password', 'secUr3pass')
    setInputValue(fixture, 'input#confirmPassword', 'secUr3pass')
    setCheckBoxValue(fixture, 'input#terms', true)

    clickElement(fixture, '[type=submit]')
    fixture.detectChanges()

    expect(component.status).toEqual('loading')

    tick()
    fixture.detectChanges()

    expect(component.status).toEqual('success')
    expect(component.form.valid).toBeTruthy()
    expect(userService.create).toHaveBeenCalledTimes(1)
  }))

  it('fill inputs from UI and send data also changes status from "loading" => "error"', fakeAsync(()=>{
    userService.create.and.returnValue(asyncError('500 Server Error'))

    setInputValue(fixture, 'input#name', 'Gerardo')
    setInputValue(fixture, 'input#email', 'gera@gera.com')
    setInputValue(fixture, 'input#password', 'secUr3pass')
    setInputValue(fixture, 'input#confirmPassword', 'secUr3pass')
    setCheckBoxValue(fixture, 'input#terms', true)

    clickElement(fixture, '[type=submit]')
    fixture.detectChanges()

    expect(component.status).toEqual('loading')

    tick()
    fixture.detectChanges()

    expect(component.status).toEqual('error')
    expect(userService.create).toHaveBeenCalledTimes(1)
  }))
});
