import { Component, Input, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-tvshow',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-tvshow.component.html',
  styleUrl: './edit-tvshow.component.css'
})
export class EditTvshowComponent implements OnInit {
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
      this.loadTvShow();
    }
  
    private loadTvShow(): void {
      if (!this.tvshowID) {
        this.errorMessage = 'ID del TV Show no proporcionado.';
        return;
      }
    
      this.supaService.getTvshowsID(this.tvshowID).subscribe({
        next: (show) => {
          if (show && show.length > 0) {
            this.tvshowForm.patchValue(show[0]);
            console.log('Datos del TV Show cargados:', show[0]);
          } else {
            this.errorMessage = 'No se encontró el TV Show.';
          }
        },
        error: (err) => {
          console.error('Error al cargar el TV Show:', err);
          this.errorMessage = 'Error al cargar el TV Show: ' + err.message;
        }
      });
    }
    

    updateTvShow(): void {
      if (this.tvshowForm.invalid) {
        this.tvshowForm.markAllAsTouched();
        return;
      }
  
      const updatedData = this.tvshowForm.value;
  
      this.supaService.updateTvShow(this.tvshowID, updatedData).subscribe({
        next: () => {
          this.successMessage = '¡TV Show actualizado correctamente!';
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        error: (err) => {
          console.error('Error al actualizar el TV Show:', err);
          this.errorMessage = 'Error al actualizar el TV Show: ' + err.message;
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
    
    
    

}
