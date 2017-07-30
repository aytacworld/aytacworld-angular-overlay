import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer } from '@angular/core';

let identifier = 0;

@Directive({ selector: '[overlay]' })
export class OverlayDirective implements OnChanges, OnInit {
  @Input() overlay: boolean;
  @Input() overlayText: string = 'Loading';
  private originStyle: string;
  private id: string = `overlay-item-${identifier++}`;

  constructor (private el: ElementRef, private renderer: Renderer) { }

  ngOnInit (): void {
    const el: HTMLElement = this.el.nativeElement;
    const div: HTMLDivElement = this.renderer.createElement(el, 'div');
    this.renderer.createElement(div, 'label');
    div.className = this.id;
  }

  ngOnChanges (): void {
    const el: HTMLElement = this.el.nativeElement;
    const div = el.querySelector('.' + this.id);
    const label = div && div.querySelector('label');
    if (div && label) {
      if (this.overlay) {
        // update root element
        this.originStyle = el.getAttribute('style') || '';
        el.setAttribute('style', `position: relative;${this.originStyle}`);
        this.renderer.setElementClass(el, 'overlay', true);

        // update overlay-item
        const styles = `position: absolute;
        width:${el.clientWidth}px;
        height:${el.clientHeight}px;
        top: 0;
        left: 0;
        background: #ccc;
        opacity: 0.7;
        margin: 0;
        text-align: center;`;
        div.setAttribute('style', styles);
        label.setAttribute('style', `display: inline-block; margin-top: ${(el.clientHeight - 18) / 2}px;`);
        label.innerHTML = this.overlayText;
      } else {
        el.setAttribute('style', this.originStyle);
        div.setAttribute('style', '');
        label.setAttribute('style', '');
        label.innerHTML = '';
        this.renderer.setElementClass(el, 'overlay', false);
      }
    }
  }
}
