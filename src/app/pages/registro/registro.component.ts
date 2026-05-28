import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: [''],
      descripcion: [''],
    });
  }

  onSubmit(): void {
    console.log('Form data:', this.form.value);
    // TODO: connect to Spring Boot API
  }
}
