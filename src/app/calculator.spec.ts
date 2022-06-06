import { Calculator } from "./calculator";

describe('Calculator', ()=>{

  describe('Test for multiply', () => {
    it('#multiply should return a nine', ()=>{
      // Arrange
      const calculator = new Calculator()
      // Act
      const result = calculator.multiply(3,3)
      // Assert
      expect(result).toEqual(9)
    })
    it('#multiply should return a four', ()=>{
      // Arrange
      const calculator = new Calculator()
      // Act
      const result = calculator.multiply(2,2)
      // Assert
      expect(result).toEqual(4)
    })
  })
  describe('Test for divide', () => {
  it('#divide should return a four', ()=>{
    // Arrange
    const calculator = new Calculator()
    // Act
    expect(calculator.divide(2,2)).toEqual(1)
    expect(calculator.divide(5,2)).toEqual(2.5)
  })
  it('#divide by zero', ()=>{
    // Arrange
    const calculator = new Calculator()
    // Act - Assert
    expect(calculator.divide(500,0)).toBeNull()
  })
})

  it('test matchers', ()=>{
    const name = 'gerardo'
    let name2;
    expect(name).toBeDefined()
    expect(name2).toBeUndefined()

    expect(1 + 3 === 4).toBeTruthy()
    expect(1 + 1 === 3).toBeFalsy()
    expect(5).toBeLessThan(10)
    expect(20).toBeGreaterThan(10)
    expect('123456').toMatch(/123/)
    expect(['apples', 'oranges', 'pears']).toContain('oranges')

  })
})
