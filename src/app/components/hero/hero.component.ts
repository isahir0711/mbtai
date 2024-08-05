import { Component } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { RouterLink } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { AnalysisDTO } from '../../interfaces/analisys';
import { examples } from '../../data/examples';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CardComponent,RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  examples:AnalysisDTO[] = examples;

  /**
   *
   */
  constructor(private supaSerivce:SupabaseService) {

  }

  ngAfterViewInit(): void {
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
