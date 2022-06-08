import { FormControl, FormGroup } from "@angular/forms";
import { MyValidators } from "./validators";

fdescribe('Test for my validators', () => {
  describe('test for validPassword', () => {
    it('return null when the password is right', ()=> {
      const control = new FormControl()
      control.setValue('gerardo123')

      const rta = MyValidators.validPassword(control)

      expect(rta).toBeNull()
    })
    it('returns "{invalid_password: true}"', ()=>{
      const control = new FormControl()
      control.setValue('gerardo')

      const rta = MyValidators.validPassword(control)

      expect(rta).toEqual({invalid_password: true})
    })
  })
  describe('test for matchPasswords', () => {
    it('return null when the password is right', ()=> {
      const group = new FormGroup({
        password: new FormControl('123456'),
        confirmPassword: new FormControl('123456')
      })

      const rta = MyValidators.matchPasswords(group)

      expect(rta).toBeNull()
    })
    it('returns "{match_password: true}"', ()=>{
      const group = new FormGroup({
        password: new FormControl('123456'),
        confirmPassword: new FormControl('1234s6')
      })

      const rta = MyValidators.matchPasswords(group)

      expect(rta).toEqual({match_password: true})
    })
    it('throws error is match fields are not found', ()=>{
      const group = new FormGroup({
        psassword: new FormControl('123456'),
        confirmPassword: new FormControl('1234s6')
      })

      const errorSafe = () => MyValidators.matchPasswords(group)

      expect(errorSafe).toThrow(new Error('matchPassword: fields not found'))
    })
  })
})
