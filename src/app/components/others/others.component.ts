import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.sass']
})
export class OthersComponent implements OnInit {
  color: string = 'blue'
    constructor() { }

  ngOnInit(): void {
  }

}