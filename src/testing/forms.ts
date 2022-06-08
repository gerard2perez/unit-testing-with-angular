import { ComponentFixture } from "@angular/core/testing"
import { query, queryById } from "./finders"

export function setInputValue<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  value: string,
  withTestId: boolean = false
) {
  const inputDe = withTestId ? queryById(fixture, selector) : query(fixture, selector)
  const inputEl: HTMLInputElement = inputDe.nativeElement

  inputEl.value = value
  inputEl.dispatchEvent(new Event('input'))
  inputEl.dispatchEvent(new Event('blur'))
}

export function setCheckBoxValue<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  value: boolean,
  withTestId: boolean = false
) {
  const inputDe = withTestId ? queryById(fixture, selector) : query(fixture, selector)
  const inputEl: HTMLInputElement = inputDe.nativeElement

  inputEl.checked = value
  inputEl.dispatchEvent(new Event('change'))
  inputEl.dispatchEvent(new Event('blur'))
}
