import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { SupabaseService } from '../../services/supabase.service';
import { map, Subscription } from 'rxjs';
import { TvshowCardComponent } from '../tvshow-card/tvshow-card.component';
import { ItvShow } from '../i-tvshow';
import { SearchService } from '../../services/search.service';
import { FilterPipe } from '../../pipes/filter.pipe';

@Component({
  selector: 'app-tvshow-list',
  imports: [CommonModule, TvshowCardComponent, FilterPipe],
  templateUrl: './tvshow-list.component.html',
  styleUrl: './tvshow-list.component.css'
})
export class TvshowListComponent implements OnInit, OnDestroy {

  constructor(private supabaseService: SupabaseService,
    private searchService: SearchService
  ){}

  public tvshows: ItvShow[] = [];
  private searchSubscription? : Subscription;
  public searchValue: string = "";
 // private intervalSubscritor?: Subscription;
 // public n = 0;

  ngOnInit(): void {

    this.supabaseService.getTvshows().subscribe({
      next: tvshows => {
       console.log(tvshows);
       this.tvshows = tvshows;
      },
      error: err => console.log(err),
      complete: ()=> console.log('Received')
    })

    this.searchSubscription = this.searchService.searchSubject
    .pipe(map(searchValue => searchValue.toLowerCase()))
    .subscribe(searchValue => {
      this.searchValue = searchValue;
    })
  }



  ngOnDestroy(): void {
   // this.intervalSubscritor?.unsubscribe();
   this.searchSubscription?.unsubscribe();
  }

  


}
