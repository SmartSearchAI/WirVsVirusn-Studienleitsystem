import { Component, OnInit} from '@angular/core';
import {Pairwise_Compare, Entity, Question, Compare, Ranking, Score} from '../Models/Questionair_Model';

@Component({
  selector: 'Agile_Fluency-Questionair',
  templateUrl: './Agile_Fluency.Questionair.component.html',
  styleUrls: ['./Agile_Fluency.Questionair.component.scss']
})

export class AgileFluencyQuestionairComponent implements OnInit {
  Questions: Array<{"Index": Array<number>, "Question": Question}>;
  Compare: Pairwise_Compare
  Entities: Array<Entity>;
  Scores: Array<Score>;
  constructor() {
    this.Entities = new Array<Entity>();
    this.Entities.push(new Entity("A"));
    this.Entities.push(new Entity("B"));
    this.Entities.push(new Entity("C"));
    this.Entities.push(new Entity("D"));
    this.Compare = new Pairwise_Compare(this.Entities);
    this.Questions = this.Compare.GetQuestions(false);
    this.Scores = new Array<Score>();
  }
  getType(item: Question){
    let type: string = "undefined";
    if (item instanceof Compare){
      type = "Compare";
    } else if (item instanceof Ranking){
      type = "Rank";
    }
    return type;
  }
  ngOnInit() {
  }
  onSubmit(){
    console.log("submit");
    let n: Number = this.Entities.length;
    
    this.Questions.forEach(item => {
      let i: number = item.Index[0];
      let j: number = item.Index[1];
      this.Compare.Ratings[i][j] = item.Question.Value;
    });
    this.Scores = this.Compare.GetScore()
  }
}


