import { ComponentFixture } from "@angular/core/testing";
import { query, queryById } from "./finders";

export function clickEvent<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  withTestId: boolean = false,
  event: unknown = null
) {
  const debugElement = withTestId ? queryById(fixture, selector) : query(fixture, selector)
  debugElement.triggerEventHandler('click', event)
}
export function clickElement<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  withTestId: boolean = false,
  event: unknown = null
) {
  const debugElement = withTestId ? queryById(fixture, selector) : query(fixture, selector)
  const element: HTMLElement = debugElement.nativeElement
  element.click()
}
