import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  
  logged: boolean = false;

  searchForm: FormGroup;

  constructor(
    private supaService: SupabaseService, 
    private router: Router,
    private searchService: SearchService,
    private formBuilder: FormBuilder) {
  
      this.searchForm = this.formBuilder.group({
        searchInput: [''],
      })
  }

  ngOnInit(): void {
    this.logged = this.supaService.loggedSubject.getValue();
    this.supaService.loggedSubject.subscribe(logged => this.logged = logged)
    this.supaService.isLogged();

    this.searchForm.get('searchInput')?.valueChanges
    .pipe(
      debounceTime(200),
      distinctUntilChanged()
    )
    .subscribe(this.searchService.searchSubject);
  }

  logout():void {
    this.supaService.logout();
  }

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

}
