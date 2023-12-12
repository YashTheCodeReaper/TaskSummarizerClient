import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JaptGuideComponent } from './japt-guide.component';

describe('JaptGuideComponent', () => {
  let component: JaptGuideComponent;
  let fixture: ComponentFixture<JaptGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JaptGuideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JaptGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
