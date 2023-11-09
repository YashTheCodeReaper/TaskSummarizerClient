import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appOutsideClick]',
})
export class OutsideClickDirective {
  @Output() outsideClick = new EventEmitter<void>();
  @Input() clickExceptions: any = [];

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    const targetElement = event.target as HTMLElement | any;
    let skipEmit = false;

    if (this.clickExceptions.length) {
      let targetElCopy: any = event.target;
      this.clickExceptions.forEach((className: string) => {
        if (className && !skipEmit) {
          while (targetElCopy) {
            if (targetElCopy.classList.contains(className)) {
              skipEmit = true;
              break;
            }
            targetElCopy = targetElCopy.parentElement;
          }
        }
      });
    }

    if (!this.elementRef.nativeElement.contains(targetElement) && !skipEmit) {
      this.outsideClick.emit();
    }
  }
}
