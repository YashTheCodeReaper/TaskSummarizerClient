import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JiraInitFetcherComponent } from './jira-init-fetcher.component';

describe('JiraInitFetcherComponent', () => {
  let component: JiraInitFetcherComponent;
  let fixture: ComponentFixture<JiraInitFetcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JiraInitFetcherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JiraInitFetcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
