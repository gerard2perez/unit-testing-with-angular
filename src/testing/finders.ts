import { Type } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
export function getText<T>(fixture: ComponentFixture<T>, testId: string) {
  const debugElement = queryById(fixture, testId)
  return debugElement.nativeElement.textContent
}
export function queryAllByDirective<T, D>(fixture: ComponentFixture<T>, directive: Type<D>) {
  return fixture.debugElement.queryAll(By.directive(directive));
}
export function queryAll<T>(fixture: ComponentFixture<T>, selector: string) {
  return fixture.debugElement.queryAll(By.css(selector));
}
export function query<T>(fixture: ComponentFixture<T>, selector: string) {
  const debugElement = fixture.debugElement.query(By.css(selector));
  if(!debugElement) {
    throw new Error(`query: Element with ${selector} not found`)
  }
  return debugElement
}
export function queryById<T>(fixture: ComponentFixture<T>, testId: string) {
  return query(fixture, `[data-testid="${testId}"]`)
}
