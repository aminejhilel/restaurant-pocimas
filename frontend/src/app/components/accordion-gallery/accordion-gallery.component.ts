import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
  AfterViewInit,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';

export interface GalleryItem {
  image: string;
  label?: string;
  link?: string;
  alt?: string;
}

const DEFAULT_ITEMS: GalleryItem[] = [
  { image: 'https://picsum.photos/id/1015/900/1200', label: 'Canyon', link: '#' },
  { image: 'https://picsum.photos/id/1018/900/1200', label: 'Ridgeline', link: '#' },
  { image: 'https://picsum.photos/id/1039/900/1200', label: 'Falls', link: '#' },
  { image: 'https://picsum.photos/id/1043/900/1200', label: 'Harbour', link: '#' },
  { image: 'https://picsum.photos/id/1044/900/1200', label: 'Skyline', link: '#' }
];

@Component({
  selector: 'app-accordion-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion-gallery.component.html',
  styleUrls: ['./accordion-gallery.component.scss']
})
export class AccordionGalleryComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() items: GalleryItem[] = DEFAULT_ITEMS;
  @Input() defaultIndex = 2;
  @Input() accentColor = '#D4AF37'; // Using a gold accent for pocimas theme
  @Input() overlayColor = '#060010';
  @Input() textColor = '#ffffff';
  @Input() height = 460;
  @Input() gap = 10;
  @Input() radius = 0; // The pocimas images didn't look like they had large radius, so 0 or 8.
  @Input() expandRatio = 0.52;
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() duration = 0.6;
  @Input() ease = 'power3.out';
  @Input() parallax = 0.5;
  @Input() tilt = 8;
  @Input() stagger = 0.06;
  @Input() trigger: 'hover' | 'click' = 'hover';
  @Input() showLabels = true;
  @Input() grayscale = false; // Setting false as pocimas pictures are in color
  @Input() className = '';

  @ViewChild('root') rootRef!: ElementRef<HTMLDivElement>;
  @ViewChildren('panel') panelRefs!: QueryList<ElementRef<HTMLAnchorElement | HTMLDivElement>>;
  @ViewChildren('media') mediaRefs!: QueryList<ElementRef<HTMLSpanElement>>;
  @ViewChildren('bar') barRefs!: QueryList<ElementRef<HTMLSpanElement>>;
  @ViewChildren('text') textRefs!: QueryList<ElementRef<HTMLSpanElement>>;

  active = 0;
  tl: gsap.core.Timeline | null = null;
  firstRun = true;
  mediaSize = 320;
  resizeObserver: ResizeObserver | null = null;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.active = Math.min(Math.max(this.defaultIndex, 0), this.items.length - 1);
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;
    
    this.measure();
    this.resizeObserver = new ResizeObserver(() => this.measure());
    if (this.rootRef?.nativeElement) {
      this.resizeObserver.observe(this.rootRef.nativeElement);
    }
    
    // Using setTimeout to ensure Angular has fully rendered before calculating layout
    setTimeout(() => {
      this.applyLayout(!this.firstRun);
      this.firstRun = false;
    });
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.tl) {
      this.tl.kill();
    }
  }

  measure() {
    const el = this.rootRef?.nativeElement;
    if (!el) return;

    const count = this.items.length;
    const rect = el.getBoundingClientRect();
    const vertical = this.orientation === 'vertical';
    const total = vertical ? rect.height : rect.width;
    const usable = Math.max(total - this.gap * (count - 1), 120);
    const size = Math.max(140, usable * Math.min(Math.max(this.expandRatio, 0.2), 0.9) * 1.22);
    
    this.mediaSize = size;
    el.style.setProperty('--ag-media-size', `${size}px`);
    
    if (!this.firstRun) {
      this.applyLayout(true);
    }
  }

  applyLayout(animate: boolean = true) {
    if (!this.isBrowser) return;
    
    const panels = this.panelRefs?.toArray();
    if (!panels || !panels.length) return;

    const count = this.items.length;
    const vertical = this.orientation === 'vertical';
    const r = Math.min(Math.max(this.expandRatio, 0.2), 0.9);
    const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (this.tl) {
      this.tl.kill();
    }

    const dur = animate && !prefersReduced ? this.duration : 0;
    this.tl = gsap.timeline();

    const medias = this.mediaRefs?.toArray() || [];
    const bars = this.barRefs?.toArray() || [];
    const texts = this.textRefs?.toArray() || [];

    panels.forEach((panelRef, i) => {
      const panel = panelRef.nativeElement;
      const isActive = i === this.active;
      const media = medias[i]?.nativeElement;
      const bar = bars[i]?.nativeElement;
      const text = texts[i]?.nativeElement;

      const rot = isActive ? 0 : i < this.active ? this.tilt : -this.tilt;
      const rotProp = vertical ? { rotateX: -rot } : { rotateY: rot };

      this.tl!.to(panel, { flexGrow: isActive ? grow : 1, ...rotProp, duration: dur, ease: this.ease }, 0);

      if (media) {
        const drift = Math.max(-1.5, Math.min(1.5, this.active - i));
        const shift = drift * this.parallax * this.mediaSize * 0.06;
        const gray = this.grayscale ? (isActive ? 0 : 1) : 0;
        this.tl!.to(
          media,
          {
            xPercent: -50,
            yPercent: -50,
            x: vertical ? 0 : isActive ? 0 : shift,
            y: vertical ? (isActive ? 0 : shift) : 0,
            '--ag-gray': gray,
            '--ag-dim': isActive ? 0 : 0.35,
            duration: dur,
            ease: this.ease
          },
          0
        );
      }

      if (this.showLabels && bar && text) {
        if (isActive) {
          this.tl!.to([bar, text], { opacity: 1, x: 0, duration: dur, ease: this.ease, stagger: prefersReduced ? 0 : this.stagger }, 0);
        } else {
          this.tl!.to([bar, text], { opacity: 0, x: -14, duration: dur * 0.6, ease: this.ease }, 0);
        }
      }
    });
  }

  handleEnter(i: number) {
    if (this.trigger === 'hover') {
      if (this.active !== i) {
        this.active = i;
        this.applyLayout(true);
      }
    }
  }

  handleClick(i: number, e: Event) {
    if (i !== this.active) {
      e.preventDefault();
      this.active = i;
      this.applyLayout(true);
    }
  }

  handleKeyDown(i: number, e: KeyboardEvent) {
    const count = this.items.length;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      this.active = (i + 1) % count;
      this.applyLayout(true);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      this.active = (i - 1 + count) % count;
      this.applyLayout(true);
    }
  }
}
