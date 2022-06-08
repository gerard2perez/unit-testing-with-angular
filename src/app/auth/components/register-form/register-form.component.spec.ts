import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { generateOneUser } from 'src/app/models/user.mock';
import { UsersService } from 'src/app/services/user.service';
import { clickElement, getText, mockObservable, query, queryById, setInputValue } from 'src/testing';

import { RegisterFormComponent } from './register-form.component';

fdescribe('RegisterFormComponent', () => {
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
});