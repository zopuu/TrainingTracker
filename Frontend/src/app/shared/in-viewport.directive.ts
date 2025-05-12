import {
    Directive,
    ElementRef,
    EventEmitter,
    Output,
    AfterViewInit,
    OnDestroy
  } from '@angular/core';
  
  @Directive({ selector: '[inViewport]' })
  export class InViewportDirective implements AfterViewInit, OnDestroy {
    @Output() visible = new EventEmitter<void>();
    private observer!: IntersectionObserver;
  
    constructor(private el: ElementRef<HTMLElement>) {}
  
    ngAfterViewInit() {
      this.observer = new IntersectionObserver(
        entries => {
          for (let entry of entries) {
            if (entry.isIntersecting) {
              this.visible.emit();
              this.observer.unobserve(this.el.nativeElement);
            }
          }
        },
        { threshold: 0.3 }  // 30% visible
      );
      this.observer.observe(this.el.nativeElement);
    }
  
    ngOnDestroy() {
      this.observer.disconnect();
    }
  }
  