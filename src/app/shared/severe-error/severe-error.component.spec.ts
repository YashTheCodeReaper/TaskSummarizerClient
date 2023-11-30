import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SevereErrorComponent } from './severe-error.component';

describe('SevereErrorComponent', () => {
  let component: SevereErrorComponent;
  let fixture: ComponentFixture<SevereErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SevereErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SevereErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
