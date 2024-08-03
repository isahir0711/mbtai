import { Component } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { Router, RouterLink } from '@angular/router';
import { AuthComponent } from "../auth/auth/auth.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, AuthComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  islogged = false;

  constructor(private supaService: SupabaseService,private router: Router) {
  }

  signOut(){
    this.supaService.signout().then(() => {
      window.location.reload();
    });

  }

}
