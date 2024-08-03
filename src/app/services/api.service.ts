import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Analisys } from '../interfaces/analisys';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient:HttpClient) { }

  private backendurl = environment.backendurl;

  getAnalisys(username:string): Observable<Analisys> {
    return this.httpClient.get<Analisys>(this.backendurl + '/analisys/' + username);
  }
}
