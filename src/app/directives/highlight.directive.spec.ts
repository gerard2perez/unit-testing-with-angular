import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { HighlightDirective } from './highlight.directive';

@Component({
  template: `
    <h5 data-test-id="title" highlight>default</h5>
    <h5 data-test-id="sub-title" highlight="yellow">yellow</h5>
    <p highlight>parrafo</p>
    <input [(ngModel)]=color [highlight]=color />
    <p>otro parrafo</p>
  `
})class HostComponent{
  color = 'pink'
}

fdescribe('HighlightDirective', () => {
  let component: HostComponent
  let fixture: ComponentFixture<HostComponent>
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HostComponent, HighlightDirective]
    }).compileComponents()

    fixture = TestBed.createComponent(HostComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

  })
  it('creates a component', ()=>{
    expect(component).toBeTruthy()
  })
  it('has four highlight elements', () => {
    const elements = fixture.debugElement.queryAll(By.directive(HighlightDirective))
    const elementsWithOut = fixture.debugElement.queryAll(By.css('*:not([highlight])'))

    expect(elements.length).toEqual(4)
    expect(elementsWithOut.length).toEqual(2)
  });

  it('elements highlight match with bgColor', () => {
    const [firstDeHigh, secondDeHigh, thirdDeHigh] = fixture.debugElement.queryAll(By.directive(HighlightDirective))

    expect(firstDeHigh.nativeElement.style.backgroundColor).toEqual('gray')
    expect(secondDeHigh.nativeElement.style.backgroundColor).toEqual('yellow')
    expect(thirdDeHigh.nativeElement.style.backgroundColor).toEqual('gray')
  });

  it('h5.title has the defaultColor', () => {
    const titleDebug = fixture.debugElement.query(By.css('[data-test-id=title]'))
    const dir = titleDebug.injector.get(HighlightDirective)
    expect(titleDebug.nativeElement.style.backgroundColor).toEqual(dir.defaultColor)
  });
  it('h5.sub-title has the bgColor', () => {
    const titleDebug = fixture.debugElement.query(By.css('[data-test-id=sub-title]'))
    const dir = titleDebug.injector.get(HighlightDirective)
    expect(titleDebug.nativeElement.style.backgroundColor).toEqual(dir.bgColor)
  });
  it('<bind> and changes the bgColor', () => {
    const inputDebug = fixture.debugElement.query(By.css('input'))
    const dir = inputDebug.injector.get(HighlightDirective)
    const inputElement: HTMLInputElement = inputDebug.nativeElement

    expect(inputElement.style.backgroundColor).toEqual('pink')

    inputElement.value = 'red'
    inputElement.dispatchEvent(new Event('input'))
    fixture.detectChanges()

    expect(inputElement.style.backgroundColor).toEqual('red')
    expect(dir.bgColor).toEqual('red')
    expect(component.color).toEqual('red')
  });
});
