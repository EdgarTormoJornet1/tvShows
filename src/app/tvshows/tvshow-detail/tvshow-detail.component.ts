import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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

  constructor(private supabaseService: SupabaseService,
    private router: Router){

  }



  ngOnInit(): void {

    this.logged = this.supabaseService.loggedSubject.getValue();
    this.supabaseService.loggedSubject.subscribe(logged => this.logged = logged)
    this.supabaseService.isLogged();

    this.supabaseService.getTvshowsID(this.tvshowID).subscribe({
      next: tvshow => {
       this.tvshow = tvshow[0];
      },
      error: err => console.log(err),
      complete: ()=> console.log('Received')
    })
  }

  deleteTvShow() {
    const confirmation = window.confirm('¿Estás seguro de que quieres eliminar este TV Show?');
  
    if (confirmation && this.tvshowID) {
      this.supabaseService.deleteTvShow(this.tvshowID).subscribe({
        next: () => {
          alert('TV Show eliminado con éxito');
          
          this.router.navigate(['/main']);
        },
        error: (err) => {
          console.error('Error al eliminar el tv-show:', err);
          alert('Hubo un error al eliminar el TV Show. Por favor, intenta de nuevo.');
        }
      });
    } else if (!confirmation) {
      console.log('Eliminación cancelada');
    }

  }

}
