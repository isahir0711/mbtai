import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { AnalysisDTO } from '../interfaces/analisys';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient:HttpClient) { }

  private backendurl = environment.backendurl;

  getAnalisys(username:string): Observable<AnalysisDTO> {
    return this.httpClient.get<AnalysisDTO>(this.backendurl + '/analysis/' + username);
  }
}
