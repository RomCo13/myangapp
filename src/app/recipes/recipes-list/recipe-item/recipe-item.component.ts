import { Component, OnInit, Output, Input , EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  constructor(private router :Router,private route:ActivatedRoute) { }

  @Input() recipeItem :Recipe;
  @Input() index:number;

  ngOnInit(): void {

  }

}
