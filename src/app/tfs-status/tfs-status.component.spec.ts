import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TfsStatusComponent } from './tfs-status.component';

describe('TfsStatusComponent', () => {
  let component: TfsStatusComponent;
  let fixture: ComponentFixture<TfsStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TfsStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TfsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
