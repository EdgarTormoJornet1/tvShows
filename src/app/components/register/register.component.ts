import { Component } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  registerForm: FormGroup;


  email: string = '';
  password: string = '';
  error: string | undefined;

    
  constructor(private supaService: SupabaseService, private formBuilder: FormBuilder, private router: Router){

     this.registerForm = this.formBuilder.group({
       email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")]],
       passwords: this.formBuilder.group({
        password: ['', [Validators.required, Validators.pattern('.*[0-9].*'), this.passwordValidator(8)]],
        password2: ['', [Validators.required, Validators.minLength(8), Validators.pattern('.*[0-9].*')]],
      },  {
        validators:
            this.passwordCrossValidator
     })
 
       
     });
  }




  get emailNotValid(){
    return this.registerForm.get('email')?.invalid && this.registerForm.get('email')?.touched;
  }

  get password1NotValid(){
    if( this.registerForm.get('password')?.invalid && this.registerForm.get('password')?.touched){
      return 'is-invalid';
    } else if ( this.registerForm.get('password')?.touched && this.registerForm.get('password')?.valid) {
      return 'is-valid';
    }
    return '';
  }

  get password2NotValid(){
    if( this.registerForm.get('password2')?.invalid && this.registerForm.get('password2')?.touched){
      return 'is-invalid';
    } else if ( this.registerForm.get('password2')?.touched && this.registerForm.get('password2')?.valid) {
      return 'is-valid';
    }
    return '';
  }



  get crossPasswordsNotValid(){
    if (this.registerForm.get('passwords')?.invalid) return true
    return false;
  }


  

  



  passwordValidator(minLength: number): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      if (c.value) {
        let valid = c.value.length >= minLength && c.value.includes('5');
        return valid ? null : {password: "no valida"}
        }
        return null; };
   }

   passwordCrossValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const ps = control.get('password');
    const ps2 = control.get('password2');
    console.log(ps?.value,ps2?.value);
    this.password = ps?.value;
    
    return ps && ps2 && ps.value === ps2.value ? null : { passwordCrossValidator: true };
  };
   




  
  

    sendRegister(){
      if (this.registerForm.valid) {
        const email = this.registerForm.get('email')?.value;
        const password = this.registerForm.get('passwords.password')?.value;


        this.supaService.register(email,password).subscribe(
          {next: registerData => {console.log(registerData)
            this.router.navigate(['/login'])},
            complete: ()=> {console.log("complete")},
            error: error =>  this.error = error
           }
        )
      } else {
        console.log("From is invalid");
      }

    }
  


}
