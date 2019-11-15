import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniverseFilterComponent } from './universe-filter.component';

describe('UniverseFilterComponent', () => {
  let component: UniverseFilterComponent;
  let fixture: ComponentFixture<UniverseFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniverseFilterComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniverseFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
