import { Component } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { RouterLink } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { AnalysisDTO } from '../../interfaces/analisys';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CardComponent,RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  examples:AnalysisDTO[] = [];

  /**
   *
   */
  constructor(private supaSerivce:SupabaseService) {

  }

  getLatest(){
    this.supaSerivce.getLatestAnalysis().then(res=>{
      for (let index = 0; index < res.length; index++) {
        const element = res[index];
        let temp = {
          description: element.description,
          mbti: element.mbti,
          username: element.username,
          profilePicUrl: ''
        }
        this.examples.push(temp);
      };
    });
  }

  ngAfterViewInit(): void {
    this.getLatest();
  }

  ngOnInit(): void {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      this.addAnimation();
    }
    
  }

  addAnimation() {
    const scrollers = document.querySelectorAll(".scroller");

    if(this.examples.length === 0){
      return;
    }

    scrollers.forEach((scroller) => {
      

      scroller.setAttribute("data-animated", "true");
      const scrollerInner = scroller.querySelector(".scroller__inner");
      if (!scrollerInner) return;
      const scrollerContent = Array.from(scrollerInner.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem: HTMLElement = item.cloneNode(true) as HTMLElement;
        if (!duplicatedItem) return;
        duplicatedItem.setAttribute("aria-hidden", "true");
        scrollerInner.appendChild(duplicatedItem);
      });


    });
  }
}
