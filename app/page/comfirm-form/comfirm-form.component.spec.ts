import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComfirmFormComponent } from './comfirm-form.component';

describe('ComfirmFormComponent', () => {
  let component: ComfirmFormComponent;
  let fixture: ComponentFixture<ComfirmFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComfirmFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComfirmFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
