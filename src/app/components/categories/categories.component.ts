import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsApiService } from '../../service/news.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: string[] = [
    'SCIENCE', 
    'BUSINESS', 
    'SPORTS', 
    'ENTERTAINMENT', 
    'TECHNOLOGY', 
    'GENERAL', 
    'HEALTH'
  ];
  dropdownOpen: boolean = false;
  selectedCategory: string = 'SCIENCE'; 
  categoryNews: any = { articles: [] };
  trendingNews: any = { articles: [] }; 
  currentRecentPage: number = 1;
  currentPopularPage: number = 1;
  pageSize: number = 5; 

  constructor(
    private route: ActivatedRoute,
    private newsApiService: NewsApiService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedCategory = params['category'] || 'SCIENCE';
      console.log(`Category from URL: ${this.selectedCategory}`);
      this.loadRecentNews(this.selectedCategory, this.currentRecentPage);
      this.loadTrendingNews(this.selectedCategory, this.currentPopularPage);
    });
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.dropdownOpen = false;
    console.log(`Selected category: ${category}`);
    window.history.replaceState({}, '', `/categories?category=${this.selectedCategory}`);
    this.currentRecentPage = 1; 
    this.currentPopularPage = 1; 
    this.loadRecentNews(category, this.currentRecentPage);
    this.loadTrendingNews(category, this.currentPopularPage);
  }

  private loadRecentNews(category: string, page: number): void {
    this.newsApiService.getTopHeadlines('us', category, page).subscribe(
      (data) => {
        this.categoryNews.articles = data.articles.slice(0, this.pageSize);
        if (!this.categoryNews.articles || this.categoryNews.articles.length === 0) {
          console.log(`No recent articles found for category: ${category}`);
        }
      },
  
    );
  }

  private loadTrendingNews(category: string, page: number): void {
    this.newsApiService.getTrendingCategory(category, page).subscribe(
      (data) => {
        this.trendingNews.articles = data.articles.slice(0, this.pageSize);
        if (!this.trendingNews.articles || this.trendingNews.articles.length === 0) {
          console.log(`No trending articles found for category: ${category}`);
        }
      },
    );
  }

  goToPage(section: string, page: number): void {
    if (page < 1) return;

    if (section === 'recent') {
      this.currentRecentPage = page;
      this.loadRecentNews(this.selectedCategory, this.currentRecentPage);
    } else if (section === 'popular') {
      this.currentPopularPage = page;
      this.loadTrendingNews(this.selectedCategory, this.currentPopularPage);
    }
  }

  scrollTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
