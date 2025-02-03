import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTvShowComponent } from './create-tvshow.component';

describe('CreateTvShowComponent', () => {
  let component: CreateTvShowComponent;
  let fixture: ComponentFixture<CreateTvShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTvShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTvShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
