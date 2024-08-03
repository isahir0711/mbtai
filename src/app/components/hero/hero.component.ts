import { Component } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { examples } from '../../data/examples';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CardComponent,RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  examples = examples;

  ngAfterViewInit(): void {
    //Shot out to Kevin Powell for this scroll animation
    const scrollers = document.querySelectorAll(".scroller");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }

    function addAnimation() {
      scrollers.forEach((scroller) => {

        if (examples.length === 0) {
          return;
        }

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
}
