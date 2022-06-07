import { Component, OnInit } from '@angular/core';
import { generateOnePerson } from 'src/app/models/person.mock';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.sass']
})
export class PeopleComponent implements OnInit {
  person: Person = generateOnePerson()
  constructor() { }

  ngOnInit(): void {
  }

}
