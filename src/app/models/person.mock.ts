import { faker } from "@faker-js/faker"
import { Person } from "./person.model"

export const generateOnePerson = () => {
  return new Person(
    faker.name.firstName(),
    faker.name.lastName(),
    faker.datatype.number({max: 100}),
    faker.datatype.number({precision: 0.01, min: 1, max: 200}),
    faker.datatype.number({precision: 0.01, min: 0.8, max: 2.5})
  )
}
export const generateManyPeople = (n: number) => {
  return Array(n).fill(0).map(_=>generateOnePerson())
}
