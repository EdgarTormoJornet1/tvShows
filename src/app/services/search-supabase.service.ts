import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { SupabaseService } from './supabase.service';
import { ItvShow } from '../tvshows/i-tvshow';

@Injectable({
  providedIn: 'root'
})
export class SearchSupabaseService {

  searchSubject = new BehaviorSubject<string>('');

  constructor(private supabaseService: SupabaseService) {}

  updateSearchText(value: string) {
    this.searchSubject.next(value);
  }

  searchTvShows(atributo: string, searchText: string, page: number = 1, pageSize: number = 10): Observable<ItvShow[]> {
    return this.supabaseService.getTvShowByAttribute(atributo, searchText, page, pageSize)
      .pipe(
        map(response => response.data || []),
        tap(tvShows => console.log("TV Shows filtrados", tvShows))
      );
  }
  
}
