import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      category works!
    </p>

    <div *ngIf="categories">
       {{categories|json}}
    </div>
  `,
  styles: [
  ]
})
export class CategoryComponent implements OnInit {
  
  private categoryService = inject(CategoryService);

  // i am not encouraging you to use 'any'. always create models.
  categories!: any;

  async loadCategories() {
    try {
      this.categories = await this.categoryService.getCategories();
      console.log(this.categories);
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit(): void {
    this.loadCategories();
  }
}
