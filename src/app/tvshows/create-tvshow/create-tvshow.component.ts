import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-create-tvshow',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-tvshow.component.html',
  styleUrl: './create-tvshow.component.css'
})
export class CreateTvShowComponent implements OnInit{


  @Input('id') tvshowID?: string;
  tvshowForm: FormGroup;


    constructor(private supaService: SupabaseService, private formBuilder: FormBuilder){
  
       this.tvshowForm = this.formBuilder.group({
        name: ['', Validators.required],
        number_of_seasons: ['', Validators.required],
        number_of_episodes: ['', Validators.required],
        first_air_date: ['', Validators.required],
        vote_average: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
        genres: ['', Validators.required],
        created_by: ['', Validators.required],
        networks: ['', Validators.required],
        origin_country: ['', Validators.required]
   
         
       });
    }

    get nameValid(){
      return this.tvshowForm.get('name')?.valid && 
      this.tvshowForm.get('name')?.touched;
    }

    // get nameNotValid(){
    //   return this.tvshowForm.get('name')?.invalid && this.tvshowForm.get('name')?.touched;
    // }

    ngOnInit(): void {
        if (this.tvshowID) {
          this.supaService.getTvshows(this.tvshowID).subscribe({
            next:(show) => {
              this.tvshowForm.reset(show[0]);
            },
            error: (err) => console.log(err),
            complete: () => console.log('Received'),
          });
        }
    }


    insertTvShow(): void {
      if (this.tvshowForm.invalid) {
        return;
      }
  
      const tvShowData = this.tvshowForm.value;
  
      this.supaService.insertTvShow('tv_shows', tvShowData).subscribe({
        next: (response) => {
          console.log('TV Show insertado correctamente:', response);
        },
        error: (err) => {
          console.error('Error al insertar el TV Show:', err);
        }
      });
    }
    


  





  /*
  TODO

  Tot el formulari reactiu en validadors..
  La fiuncion per enviar dades
  menús, rutes...
  


  getData - una nova de create / fromtableselect -> fromtableinsert
  */


}
