import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObProfileComponent } from './ob-profile.component';

describe('ObProfileComponent', () => {
  let component: ObProfileComponent;
  let fixture: ComponentFixture<ObProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
