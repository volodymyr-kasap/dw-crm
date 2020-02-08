import {Directive, Input, SimpleChanges, Renderer2, ElementRef, OnChanges} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnChanges{
  @Input() searchedWords: string;
  @Input() text: string = '';
  @Input() classToApply: string = 'color-selection';

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.searchedWords || !this.searchedWords.length || !this.classToApply) {
      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.text);
      return;
    }

    this.renderer.setProperty(
      this.el.nativeElement,
      'innerHTML',
      this.getFormattedText()
    );
  }

  getFormattedText() {
    // TODO ( and )
    const re = new RegExp(`(${ this.searchedWords })`, 'gi');
    return this.text.replace(re, `<span class="${this.classToApply}">$1</span>`);
  }
}
