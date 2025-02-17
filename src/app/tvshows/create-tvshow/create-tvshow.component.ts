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
  successMessage: string = '';
  errorMessage: string = '';
  


    constructor(private supaService: SupabaseService, private formBuilder: FormBuilder){
  
       this.tvshowForm = this.formBuilder.group({
        name: ['', Validators.required],
        number_of_seasons: ['', Validators.required],
        number_of_episodes: ['', Validators.required],
        first_air_date: ['', Validators.required],
        vote_average: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
        genres: ['', Validators.required],
        created_by: ['', Validators.required],
        networks: ['', Validators.required]
       });
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
        this.tvshowForm.markAllAsTouched();
        console.log("Formulario inválido:", this.tvshowForm.value);
        return;
      }
  
      const tvShowData = this.tvshowForm.value;
  
      this.supaService.insertTvShow('tv_shows', tvShowData).subscribe({
        next: (response) => {
          console.log('TV Show insertado correctamente:', response);
          this.successMessage = 'TV Show insertado correctamente!';
          this.tvshowForm.reset();
    
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        error: (err) => {
          console.error('Error al insertar el TV Show:', err);
          this.errorMessage = 'Error al insertar: ' + err.message;
        }
      });
    }






    getFieldValidity(fieldName: string) {
      const field = this.tvshowForm.get(fieldName);
      return {
        invalid: field?.invalid && (field?.touched || field?.dirty),
        valid: field?.valid && (field?.touched || field?.dirty)
      };
    }
    
    get nameNotValid() { return this.getFieldValidity('name').invalid; }
    get nameValid() { return this.getFieldValidity('name').valid; }
    
    get seasonsNotValid() { return this.getFieldValidity('number_of_seasons').invalid; }
    get seasonsValid() { return this.getFieldValidity('number_of_seasons').valid; }
    
    get episodesNotValid() { return this.getFieldValidity('number_of_episodes').invalid; }
    get episodesValid() { return this.getFieldValidity('number_of_episodes').valid; }
    
    get dateNotValid() { return this.getFieldValidity('first_air_date').invalid; }
    get dateValid() { return this.getFieldValidity('first_air_date').valid; }
    
    get voteNotValid() { return this.getFieldValidity('vote_average').invalid; }
    get voteValid() { return this.getFieldValidity('vote_average').valid; }
    
    get genresNotValid() { return this.getFieldValidity('genres').invalid; }
    get genresValid() { return this.getFieldValidity('genres').valid; }
    
    get creatorsNotValid() { return this.getFieldValidity('created_by').invalid; }
    get creatorsValid() { return this.getFieldValidity('created_by').valid; }
    
    get networksNotValid() { return this.getFieldValidity('networks').invalid; }
    get networksValid() { return this.getFieldValidity('networks').valid; }
    
    
    


  





  /*
  TODO

  Tot el formulari reactiu en validadors..
  La fiuncion per enviar dades
  menús, rutes...
  


  getData - una nova de create / fromtableselect -> fromtableinsert
  */


}
