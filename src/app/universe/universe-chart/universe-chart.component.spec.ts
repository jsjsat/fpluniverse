import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniverseChartComponent } from './universe-chart.component';

describe('UniverseChartComponent', () => {
  let component: UniverseChartComponent;
  let fixture: ComponentFixture<UniverseChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniverseChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniverseChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
