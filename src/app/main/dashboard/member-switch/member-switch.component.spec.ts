import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberSwitchComponent } from './member-switch.component';

describe('MemberSwitchComponent', () => {
  let component: MemberSwitchComponent;
  let fixture: ComponentFixture<MemberSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberSwitchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
