import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeepFaceCapture } from './deep-face-capture';

describe('DeepFaceCapture', () => {
  let component: DeepFaceCapture;
  let fixture: ComponentFixture<DeepFaceCapture>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeepFaceCapture]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeepFaceCapture);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
