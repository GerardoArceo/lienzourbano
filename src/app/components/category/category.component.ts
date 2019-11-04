import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styles: []
})
export class CategoryComponent implements OnInit {

  id = 'c' + Math.floor(Math.random() * 1000);
  categories: [];

  constructor() {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {

  }

}
