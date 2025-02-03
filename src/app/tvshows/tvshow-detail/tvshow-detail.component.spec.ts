import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvshowDetailComponent } from './tvshow-detail.component';

describe('TvshowDetailComponent', () => {
  let component: TvshowDetailComponent;
  let fixture: ComponentFixture<TvshowDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvshowDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvshowDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
