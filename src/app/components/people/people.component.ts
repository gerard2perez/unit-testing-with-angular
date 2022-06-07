import { Component, OnInit } from '@angular/core';
import { generateManyPeople, generateOnePerson } from 'src/app/models/person.mock';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.sass']
})
export class PeopleComponent implements OnInit {
  people: Person[] = generateManyPeople(3)
  selectedPerson: Person | null = null
  constructor() { }

  ngOnInit(): void {
  }
  choose(person: Person) {
    this.selectedPerson = person
  }

}
