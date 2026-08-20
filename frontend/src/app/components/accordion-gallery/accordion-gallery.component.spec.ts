import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionGalleryComponent } from './accordion-gallery.component';

describe('AccordionGalleryComponent', () => {
  let component: AccordionGalleryComponent;
  let fixture: ComponentFixture<AccordionGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionGalleryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccordionGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
