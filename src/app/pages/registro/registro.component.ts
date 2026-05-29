import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from '../../services/registro.service';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  form: FormGroup;
  enviado = signal(false);
  error = signal(false);
  cargando = signal(false);

  constructor(private fb: FormBuilder, private registroService: RegistroService) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s\-]+$/)]],
      apellido: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s\-]+$/)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[2678]\d{7}$/)]],
      codigo: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    });
  }

  stripNonAlpha(event: Event, field: string): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s\-]/g, '');
    this.form.get(field)?.setValue(input.value, { emitEvent: false });
  }

  stripNonNumeric(event: Event, field: string): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '');
    this.form.get(field)?.setValue(input.value, { emitEvent: false });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.cargando.set(true);
    this.error.set(false);

    this.registroService.crear(this.form.value).subscribe({
      next: () => {
        this.enviado.set(true);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set(true);
        this.cargando.set(false);
      }
    });
  }

  resetForm(): void {
    this.enviado.set(false);
    this.error.set(false);
    this.form.get('codigo')?.reset('');
  }
}
