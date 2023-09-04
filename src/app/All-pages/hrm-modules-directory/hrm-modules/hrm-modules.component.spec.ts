import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrmModulesComponent } from './hrm-modules.component';

describe('HrmModulesComponent', () => {
  let component: HrmModulesComponent;
  let fixture: ComponentFixture<HrmModulesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HrmModulesComponent]
    });
    fixture = TestBed.createComponent(HrmModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
