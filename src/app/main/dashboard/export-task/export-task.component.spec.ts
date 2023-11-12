import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportTaskComponent } from './export-task.component';

describe('ExportTaskComponent', () => {
  let component: ExportTaskComponent;
  let fixture: ComponentFixture<ExportTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
