import { Component, Input } from '@angular/core';
import { AnalysisDTO } from '../../interfaces/analisys';
import { examples } from '../../data/examples';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() analisys: AnalysisDTO = {
    description: '',
    mbti: '',
    username: '',
    profilePicUrl: ''
  };


  mbtiPersonalities = [
    { mbti: "INTJ", color: "#90759f" },  // Charcoal
    { mbti: "INTP", color: "#90759f" },  // Sage Green
    { mbti: "ENTJ", color: "#95627b" },  // Dark Green
    { mbti: "ENTP", color: "#95627b" },  // Golden Yellow
    { mbti: "INFJ", color: "#99c26c" },  // Royal Purple
    { mbti: "INFP", color: "#b8c645" },  // Baby Blue
    { mbti: "ENFJ", color: "#53af8a" },  // Fire Brick Red
    { mbti: "ENFP", color: "#53af8a" },  // Gold
    { mbti: "ISTJ", color: "#1c7678" },  // Navy Blue
    { mbti: "ISFJ", color: "#71cacc" },  // Baby Pink
    { mbti: "ESTJ", color: "#369395" },  // Dark Blue
    { mbti: "ESFJ", color: "#399fb9" },  // Hot Pink
    { mbti: "ISTP", color: "#e4c728" },  // Slate Gray
    { mbti: "ISFP", color: "#8c6800" },  // Light Salmon
    { mbti: "ESTP", color: "#9e7700" },  // Orange Red
    { mbti: "ESFP", color: "#e4c728" }   // Light Pink
  ];

  ngAfterViewInit(): void {
    const mbti = document.getElementById('mbti-'+this.analisys.username) as HTMLElement;
    if(mbti === null) {return;}
    const color = this.mbtiPersonalities.find(personality => personality.mbti === this.analisys.mbti)?.color;
    if(color === undefined) {return;}
    mbti.style.color = color;

    const card = document.getElementById('card-'+this.analisys.username) as HTMLElement;
    if(card === null) {return;}
    card.style.setProperty('--mbti-color', color);
  }
}

