import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Technician } from '../models/technician';

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {

  findById(id: any): Observable<Technician> {
    return this.http.get<Technician>(`${API_CONFIG.baseUrl}/technicians/${id}`);
  }

  constructor(private http: HttpClient) { }

  findAll(): Observable<Technician[]> {
    return this.http.get<Technician[]>(`${API_CONFIG.baseUrl}/technicians`);
  }

  create(technician: Technician): Observable<Technician> {
    return this.http.post<Technician>(`${API_CONFIG.baseUrl}/technicians`, technician);
  }

  update(technician: Technician): Observable<Technician> {
    return this.http.put<Technician>(`${API_CONFIG.baseUrl}/technicians/${technician.id}`,technician);
  }

  delete(id: any): Observable<Technician> {
    return this.http.delete<Technician>(`${API_CONFIG.baseUrl}/technicians/${id}`);
  }
}
