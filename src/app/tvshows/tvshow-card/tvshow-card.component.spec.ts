import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvshowCardComponent } from './tvshow-card.component';

describe('TvshowCardComponent', () => {
  let component: TvshowCardComponent;
  let fixture: ComponentFixture<TvshowCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvshowCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvshowCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
