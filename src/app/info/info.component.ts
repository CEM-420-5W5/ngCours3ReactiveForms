import { Component } from '@angular/core';
import { FormBuilder, Validators, ValidationErrors, AbstractControl, FormGroup } from '@angular/forms';

interface LoginData {
  email?: string | null ;
  name?: string | null ;
}

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {

  loginForm:FormGroup<any>;
  loginData:LoginData | null = null;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['',[Validators.required]],
    }, {validators: this.registerValidator});

    this.loginForm.valueChanges.subscribe(() => {
      this.loginData = this.loginForm.value;
    });
  }

  // Valider que le nom est present dans le email (c'est pas une bonne validation, mais c'est simplement pour pratiquer!)
  registerValidator(control: AbstractControl): ValidationErrors | null {
    // On récupère les valeurs de nos champs textes
    const email = control.get('email')?.value;
    const name = control.get('name')?.value;
    // On regarde si les champs sont remplis avant de faire la validation
    if (!email || !name) {
      return null;
    }
    // On fait notre validation
    let formValid = email.includes(name);
    // On mets les champs concernés en erreur
    if(!formValid) {
      control.get('email')?.setErrors({nameInEmail:true});
      control.get('name')?.setErrors({nameInEmail:true});
    } else {
      //S'il n'y a plus d'erreur, on les efface
      control.get('email')?.setErrors(null);
      control.get('name')?.setErrors(null);
    }
    // Si le formulaire est invalide on retourne l'erreur
    // Si le formulaire est valide on retourne null
    return !formValid?{nameInEmail:true}:null;
  }

}
