import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NInviteComponent } from './n-invite.component';

describe('NInviteComponent', () => {
  let component: NInviteComponent;
  let fixture: ComponentFixture<NInviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NInviteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
