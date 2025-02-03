import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ItvShow } from '../i-tvshow';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-tvshow-detail',
  imports: [RouterLink],
  templateUrl: './tvshow-detail.component.html',
  styleUrl: './tvshow-detail.component.css'
})
export class TvshowDetailComponent implements OnInit {

  @Input('id') tvshowID?: string;
  public tvshow: ItvShow | undefined;
  //public ingredients: Ingredient[] = [];
  logged: boolean = false;

  constructor(private supabaseService: SupabaseService){

  }



  ngOnInit(): void {

    this.logged = this.supabaseService.loggedSubject.getValue();
    this.supabaseService.loggedSubject.subscribe(logged => this.logged = logged)
    this.supabaseService.isLogged();

    this.supabaseService.getTvshows(this.tvshowID).subscribe({
      next: tvshow => {
       this.tvshow = tvshow[0];
      // this.supabaseService.getIngredients(this.recipe?.idIngredients).subscribe({
      //   next: ingredients => {
      //     this.ingredients.push(ingredients);
      //   }
      // });
      },
      error: err => console.log(err),
      complete: ()=> console.log('Received')
    })
  }


  



}
