export class Person {
  constructor(
    public name: string,
    public lastName: string,
    public age: number,
    public weight: number,
    public height: number
  )
  {}
  calcIMC(): string {
    const result = this.weight / (this.height * this.height)
    if(result<0) {
      return 'not found'
    } else if(result < 19) {
      return 'down'
    } else if( result < 25) {
      return 'normal'
    } else if( result < 27) {
      return 'overweight'
    } else if( result < 30) {
      return 'overweight 1'
    } else if( result < 40) {
      return 'overweight 2'
    } else {
      return 'overweight 3'
    }
  }
}
