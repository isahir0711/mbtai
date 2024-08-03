import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private authStateSubject = new BehaviorSubject<boolean>(false);
  authState$ = this.authStateSubject.asObservable();

  supaurl = environment.supaURL;
  supakey = environment.supaKey;

  supabaseClient: SupabaseClient;

  constructor() {
    this.supabaseClient = createClient(this.supaurl, this.supakey);
    this.supabaseClient.auth.onAuthStateChange((event, session) => {
      this.authStateSubject.next(!!session);
    });
  }

  signInGoogle(){
    return this.supabaseClient.auth.signInWithOAuth({
      provider: 'google'
    });
  }

  signInGithub(){
    return this.supabaseClient.auth.signInWithOAuth({
      provider: 'github'
    });
  }

  session() {
    return this.supabaseClient.auth.getSession();
  }

  signout(){
    return this.supabaseClient.auth.signOut();
  }
}
