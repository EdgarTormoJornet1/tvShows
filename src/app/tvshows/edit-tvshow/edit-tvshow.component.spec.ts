import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTvshowComponent } from './edit-tvshow.component';

describe('EditTvshowComponent', () => {
  let component: EditTvshowComponent;
  let fixture: ComponentFixture<EditTvshowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTvshowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTvshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
