import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface RegistroPayload {
  nombre: string;
  telefono: string;
  codigo: string;
}

@Injectable({ providedIn: 'root' })
export class RegistroService {
  private readonly apiUrl = `${environment.apiUrl}/registros`;

  constructor(private http: HttpClient) {}

  crear(registro: RegistroPayload): Observable<unknown> {
    return this.http.post(this.apiUrl, registro).pipe(timeout(10000));
  }
}
