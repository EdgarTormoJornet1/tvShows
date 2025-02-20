import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { SupabaseService } from '../../services/supabase.service';
import { debounceTime, distinctUntilChanged, map, Subscription, switchMap } from 'rxjs';
import { TvshowCardComponent } from '../tvshow-card/tvshow-card.component';
import { ItvShow } from '../i-tvshow';
import { SearchService } from '../../services/search.service';
import { FilterPipe } from '../../pipes/filter.pipe';
import { SearchSupabaseService } from '../../services/search-supabase.service';

@Component({
  selector: 'app-tvshow-list',
  imports: [CommonModule, TvshowCardComponent],
  templateUrl: './tvshow-list.component.html',
  styleUrl: './tvshow-list.component.css'
})
export class TvshowListComponent implements OnInit, OnDestroy {

  public tvshows: ItvShow[] = [];
  private searchSubscription?: Subscription;
  
  public currentPage: number = 1;
  public pageSize: number = 10; // Cambia según necesites

  constructor(
    private supabaseService: SupabaseService,
    private searchService: SearchSupabaseService
  ) {}

  ngOnInit(): void {
    this.currentPage = 1;
    this.loadTvShows();

    this.searchSubscription = this.searchService.searchSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(searchValue => this.searchService.searchTvShows("name", searchValue))
      )
      .subscribe(show => {
        this.tvshows = show;
      });
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }

  loadTvShows(): void {
    this.supabaseService.getTvshows('', '', this.currentPage, this.pageSize)
  .subscribe(tvshows => {
    console.log("TV Shows cargados:", tvshows); 
    this.tvshows = tvshows;
  });
  }
  
  nextPage(): void {
    this.currentPage++;
    this.loadTvShows();
  }
  
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadTvShows();
    }
}
}

//   constructor(private supabaseService: SupabaseService,
//     private searchService: SearchService
//   ){}

//   public tvshows: ItvShow[] = [];
//   private searchSubscription? : Subscription;
//   public searchValue: string = "";
//  // private intervalSubscritor?: Subscription;
//  // public n = 0;

//   ngOnInit(): void {

//     this.supabaseService.getTvshows().subscribe({
//       next: tvshows => {
//        console.log(tvshows);
//        this.tvshows = tvshows;
//       },
//       error: err => console.log(err),
//       complete: ()=> console.log('Received')
//     })

//     this.searchSubscription = this.searchService.searchSubject
//     .pipe(map(searchValue => searchValue.toLowerCase()))
//     .subscribe(searchValue => {
//       this.searchValue = searchValue;
//     })
//   }



//   ngOnDestroy(): void {
//    // this.intervalSubscritor?.unsubscribe();
//    this.searchSubscription?.unsubscribe();
//   }












  // public tvshows: ItvShow[] = [];
  // private searchSubscription?: Subscription;
  // //public searchValue: string = "";

  // constructor(
  //   private supabaseService: SupabaseService,
  //   private searchService: SearchSupabaseService
  // ) {}

  // ngOnInit(): void {

  //   // Nos suscribimos a los cambios en la búsqueda y recuperamos los dinosaurios
  //   this.searchSubscription = this.searchService.searchSubject
  //     .pipe(
  //       debounceTime(500), // Retrasamos la búsqueda para evitar demasiadas peticiones
  //       distinctUntilChanged(), // Evitamos peticiones innecesarias si el usuario escribe lo mismo
  //       switchMap(searchValue => this.searchService.searchTvShows("name", searchValue))
  //     )
  //     .subscribe(show => {
  //       console.log("Tv-shows filtrados:", show);
  //       this.tvshows = show; // Actualizamos la lista en el componente
  //     });
  // }

  // ngOnDestroy(): void {
  //   this.searchSubscription?.unsubscribe();
  // }

  // loadAllTvShows(): void {
  //   this.supabaseService.getTvshows().subscribe(tvshows => {
  //     this.tvshows = tvshows;
  //   });
  // }

  // searchTvShows(searchText: string): void {
  //   this.supabaseService.getTvshows(searchText).subscribe(tvshows => {
  //     this.tvshows = tvshows;
  //   });
  // }





