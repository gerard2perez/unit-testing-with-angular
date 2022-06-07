import { faker } from "@faker-js/faker";
import { generateOnePerson } from "./person.mock";
import { Person } from "./person.model";

describe('Test for Person', ()=>{
  let person: Person
  beforeEach(()=>{
    person = new Person(
      faker.name.firstName(),
      faker.name.lastName(),
      faker.datatype.number({max: 100}),
      0,
      1.65
    )
  })
  it('has the correct attributes', () => {
    expect(person).toBeDefined()
    expect(person.name).toBeDefined()
    expect(person.height).toEqual(1.65)
    expect(person.weight).toEqual(0)
  })
  describe('test for calcIMC', ()=>{
    it('return a string: down', ()=>{
      // Arrange
      person.weight = 40
      // Act
      const rta = person.calcIMC()
      // Assert
      expect(rta).toEqual('down')
    })
    it('return a string: normal', ()=>{
      // Arrange
      person.weight = 58
      // Act
      const rta = person.calcIMC()
      // Assert
      expect(rta).toEqual('normal')
    })
    it('return a string: overweight', ()=>{
      // Arrange
      person.weight = 70
      // Act
      const rta = person.calcIMC()
      // Assert
      expect(rta).toEqual('overweight')
    })
    it('return a string: overweight 1', ()=>{
      // Arrange
      person.weight = 75
      // Act
      const rta = person.calcIMC()
      // Assert
      expect(rta).toEqual('overweight 1')
    })
    it('return a string: overweight 2', ()=>{
      // Arrange
      person.weight = 85
      // Act
      const rta = person.calcIMC()
      // Assert
      expect(rta).toEqual('overweight 2')
    })
    it('return a string: overweight 3', ()=>{
      // Arrange
      person.weight = 150
      // Act
      const rta = person.calcIMC()
      // Assert
      expect(rta).toEqual('overweight 3')
    })
    it('return a string: not found', ()=>{
      // Arrange
      person.weight = -1
      // Act
      const rta = person.calcIMC()
      // Assert
      expect(rta).toEqual('not found')
    })
  })
})
