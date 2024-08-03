import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetanalisysComponent } from './getanalisys.component';

describe('GetanalisysComponent', () => {
  let component: GetanalisysComponent;
  let fixture: ComponentFixture<GetanalisysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetanalisysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetanalisysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
