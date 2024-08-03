import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject } from 'rxjs';
import { AnalysisSupa } from '../models/supaModels/analysis';
import { AnalysisDTO } from '../interfaces/analisys';

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

  signInGoogle() {
    return this.supabaseClient.auth.signInWithOAuth({
      provider: 'google'
    });
  }

  signInGithub() {
    return this.supabaseClient.auth.signInWithOAuth({
      provider: 'github'
    });
  }

  session() {
    return this.supabaseClient.auth.getSession();
  }

  signout() {
    return this.supabaseClient.auth.signOut();
  }

  async getLatestAnalysis(): Promise<AnalysisSupa[]> {
    const { data } = await this.supabaseClient
      .from('analysis')
      .select()
      .returns<AnalysisSupa[]>();


    if (!data) {
      return [];
    }

    return data;
  }

  async savaAnalysis(analysis: AnalysisDTO) {
    let userid;
    await this.supabaseClient.auth.getSession().then((root) => {
      userid = root.data.session?.user.id;
    });
    if(userid === undefined){
      return;
    }
    
    const supaAnalysis: AnalysisSupa = {
      description: analysis.description,
      mbti: analysis.mbti,
      username: analysis.username,
      user_id: userid,
      created_at: new Date()
    }

    const {error} = await this.supabaseClient.from('analysis')
    .insert(supaAnalysis);

  }
}
