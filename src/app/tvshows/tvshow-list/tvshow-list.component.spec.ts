import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvshowListComponent } from './tvshow-list.component';

describe('TvshowListComponent', () => {
  let component: TvshowListComponent;
  let fixture: ComponentFixture<TvshowListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvshowListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvshowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
