import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefOfTheWeekModalComponent } from './chef-of-the-week-modal.component';

describe('ChefOfTheWeekModalComponent', () => {
  let component: ChefOfTheWeekModalComponent;
  let fixture: ComponentFixture<ChefOfTheWeekModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChefOfTheWeekModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefOfTheWeekModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
