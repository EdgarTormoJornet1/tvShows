import { TestBed } from '@angular/core/testing';

import { SearchSupabaseService } from './search-supabase.service';

describe('SearchSupabaseService', () => {
  let service: SearchSupabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchSupabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
