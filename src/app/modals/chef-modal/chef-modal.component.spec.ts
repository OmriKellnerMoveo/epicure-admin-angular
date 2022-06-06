import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefModalComponent } from './chef-modal.component';

describe('ChefModalComponent', () => {
  let component: ChefModalComponent;
  let fixture: ComponentFixture<ChefModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChefModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
