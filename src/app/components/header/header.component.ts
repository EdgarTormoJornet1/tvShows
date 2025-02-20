import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
// import { SearchService } from '../../services/search.service';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, fromEvent, map, Subscription } from 'rxjs';
import { SearchSupabaseService } from '../../services/search-supabase.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  
  logged: boolean = false;
  searchForm: FormGroup;

  private searchSubscription?: Subscription;
  private busqueda!: string;

  //@ViewChild("searchInput") inputSearch?: ElementRef

  constructor(
    private supaService: SupabaseService, 
    private router: Router,
    //private searchService: SearchService,
    private formBuilder: FormBuilder,
    private searchService: SearchSupabaseService
  ) {
  
      this.searchForm = this.formBuilder.group({
        searchInput: [''],
      })
  }



  ngOnInit(): void {
    this.logged = this.supaService.loggedSubject.getValue();
    this.supaService.loggedSubject.subscribe(logged => this.logged = logged);
    this.supaService.isLogged();

    // Escuchar cambios en el input de búsqueda
    this.searchForm.get('searchInput')?.valueChanges.subscribe(searchValue => {
      this.busqueda = searchValue;
      this.confirmarBusqueda();
      this.searchService.searchTvShows("name",searchValue);
    });
      // .pipe(
      //   debounceTime(200),
      //   distinctUntilChanged()
      // )
      // .subscribe(text => {
      //   this.service.emitSearchText(text);
      // });
  }


  // ngAfterViewInit() {
  //   // Suscripción al evento keyup del input de búsqueda
  //   fromEvent<any>(this.inputSearch?.nativeElement, 'keyup')
  //     .pipe(
  //       map(event => event.target.value),
  //       debounceTime(400),
  //       distinctUntilChanged()
  //     ).subscribe(text => {
  //       this.service.emitSearchText(text);
  //     });
  // }



  // ngOnInit(): void {
  //   this.logged = this.supaService.loggedSubject.getValue();
  //   this.supaService.loggedSubject.subscribe(logged => this.logged = logged)
  //   this.supaService.isLogged();

  //   this.searchForm.get('searchInput')?.valueChanges
  //   .pipe(
  //     debounceTime(200),
  //     distinctUntilChanged()
  //   )
  //   .subscribe(this.searchService.searchSubject);
  // }

  logout():void {
    this.supaService.logout();
  }

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  confirmarBusqueda(){
    if (this.busqueda === undefined) {
      return;
    }
    this.searchService.updateSearchText(this.busqueda);
  }

}
