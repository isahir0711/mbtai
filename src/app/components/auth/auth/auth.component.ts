import { Component, inject, OnInit } from '@angular/core';
import { SupabaseService } from '../../../services/supabase.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [NgIf,AsyncPipe],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})

export class AuthComponent implements OnInit {
  private authStateSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> = this.authStateSubject.asObservable();

  constructor(private supaService: SupabaseService) {}

  ngOnInit(): void {
    this.checkAuth();
  }

  private checkAuth(): void {
    this.supaService.session().then(({ data }) => {
      const isAuthenticated = data.session !== null;
      this.authStateSubject.next(isAuthenticated);
    }).catch(error => {
      this.authStateSubject.next(false);
    });
  }
}