import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ReversePipe } from './reverse.pipe';


@Component({
  template: `
    <h5>{{'amor' | reverse }}</h5>
    <input [(ngModel)]=text />
    <p>{{text | reverse }}</p>
  `
})
class HostComponent{
  text = 'roma'
}


describe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });
  it('transforms "roma" to "amor"', ()=>{
    const pipe = new ReversePipe()

    const rta = pipe.transform("roma")

    expect(rta).toEqual("amor")
  })
  it('transforms "123" to "321"', ()=>{
    const pipe = new ReversePipe()

    const rta = pipe.transform("123")

    expect(rta).toEqual("321")
  })
});

describe('ReversePipe from HostComponent', ()=>{
  let component: HostComponent
  let fixture: ComponentFixture<HostComponent>
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HostComponent, HostComponent, ReversePipe]
    }).compileComponents()

    fixture = TestBed.createComponent(HostComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

  })
  it('creates a component', ()=>{
    expect(component).toBeTruthy()
  })
  it('H5 contains "roma"', ()=>{
    const h5Debug = fixture.debugElement.query(By.css('H5'))

    expect(h5Debug.nativeElement.textContent).toEqual('roma')
  })
  it('p changes from "amor" => "roma"', ()=>{
    const pDebug = fixture.debugElement.query(By.css('p'))
    const inputDebug = fixture.debugElement.query(By.css('input'))
    const inputElement: HTMLInputElement = inputDebug.nativeElement

    expect(pDebug.nativeElement.textContent).toEqual('amor')

    inputElement.value = "amor"
    inputElement.dispatchEvent(new Event('input'))
    fixture.detectChanges()

    expect(pDebug.nativeElement.textContent).toEqual('roma')
  })
})
