import { Directive, ElementRef, Input, OnInit, OnChanges, SimpleChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appImageLoader]',
  standalone: true
})
export class ImageLoaderDirective implements OnInit, OnChanges {
  @Input() appImageLoader: string = '';
  @Input() placeholder: string = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Mb2FkaW5nLi4uPC90ZXh0Pjwvc3ZnPg==';

  constructor(
    private el: ElementRef<HTMLImageElement>,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    if (this.appImageLoader) {
      this.loadImage();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appImageLoader'] && !changes['appImageLoader'].firstChange && this.appImageLoader) {
      this.loadImage();
    }
  }

  private loadImage(): void {
    const img = this.el.nativeElement;
    
    // Устанавливаем placeholder
    this.renderer.setAttribute(img, 'src', this.placeholder);
    
    // Добавляем класс загрузки
    this.renderer.removeClass(img, 'image-loaded');
    this.renderer.removeClass(img, 'image-error');
    this.renderer.addClass(img, 'image-loading');
    
    // Создаем новое изображение для предзагрузки
    const preloadImg = new Image();
    
    preloadImg.onload = () => {
      // Когда изображение загружено, устанавливаем его
      this.renderer.setAttribute(img, 'src', this.appImageLoader);
      this.renderer.removeClass(img, 'image-loading');
      this.renderer.addClass(img, 'image-loaded');
    };
    
    preloadImg.onerror = () => {
      // При ошибке загрузки показываем placeholder
      this.renderer.setAttribute(img, 'src', this.placeholder);
      this.renderer.removeClass(img, 'image-loading');
      this.renderer.addClass(img, 'image-error');
    };
    
    // Начинаем загрузку
    preloadImg.src = this.appImageLoader;
  }
}

