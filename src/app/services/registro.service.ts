import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegistroPayload {
  nombre: string;
  apellido: string;
  telefono: string;
  codigo: string;
}

@Injectable({ providedIn: 'root' })
export class RegistroService {
  private readonly apiUrl = 'http://localhost:8080/api/registros';

  constructor(private http: HttpClient) {}

  crear(registro: RegistroPayload): Observable<unknown> {
    return this.http.post(this.apiUrl, registro);
  }
}
