import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotilandComponent } from './notiland.component';

describe('NotilandComponent', () => {
  let component: NotilandComponent;
  let fixture: ComponentFixture<NotilandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotilandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotilandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
