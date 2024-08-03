import { Component } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { examples } from '../../data/examples';
import { ApiService } from '../../services/api.service';
import { catchError, map, tap } from 'rxjs';
import { AnalysisDTO } from '../../interfaces/analisys';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-getanalisys',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './getanalisys.component.html',
  styleUrl: './getanalisys.component.css'
})
export class GetanalisysComponent {

  

  analisys:any;

  error = false;

  loading = false;

  constructor(private apiService: ApiService,private supaService:SupabaseService) {
  }

  getAnalysis(){
    const usernameInput = document.getElementById('username') as HTMLInputElement;
    if(usernameInput === null){return;}
    const username = usernameInput.value;
    this.loading = true;
    const btnreq = document.getElementById('btnreq') as HTMLButtonElement;
    if(btnreq === null){return;}
    btnreq.disabled = true;
    btnreq.classList.add('disabled');

    this.apiService.getAnalisys(username).pipe(
      map((analisys:AnalysisDTO) => {
        this.analisys = analisys;
        this.loading = false;
        btnreq.disabled = false;
        btnreq.classList.remove('disabled');
      }),
      catchError(err =>{
        console.log(err);
        this.error = true;
        throw err;
      })  
    ).subscribe();

    
  }

  saveAnalysis(){
    this.supaService.savaAnalysis(this.analisys).then(res=>{
      console.log(res);
    });
  }
}
