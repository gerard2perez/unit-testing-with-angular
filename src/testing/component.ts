import { Component } from "@angular/core";

export function mockComponent(data: Component)
{
  @Component(data)
  class infly{

  }
  return  infly
}
