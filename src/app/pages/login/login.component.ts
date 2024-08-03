import { Component, inject } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  supabaseService = inject(SupabaseService);
  constructor() { }

  signInGoogle(){
    return this.supabaseService.signInGoogle();
  }

  signInGithub(){
    return this.supabaseService.signInGithub();
  }
}
