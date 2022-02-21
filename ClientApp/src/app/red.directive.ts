import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[myRed]'
})

export class MyRedDirective {
  constructor(elRef: ElementRef) {
    elRef.nativeElement.style.color = 'Red';
  }
}
