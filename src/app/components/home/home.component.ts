import { Component, OnInit } from '@angular/core';
import { NewsApiService } from '../../service/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  newsData: any;
  trendingArticles: any[] = [];
  currentSlide: number = 0;
  recentArticles: any[] = [];
  currentPage: number = 1;
  pageSize: number = 5; 
  totalPages: number[] = [];
  popularArticles: any[] = [];
  popularCurrentPage: number = 1;
  editorPicks: any[] = [];
  editorPicksCurrentPage: number = 1;
  trendingPosts: any[] = [];
  trendingPostsCurrentPage: number = 1;

  constructor(private newsApiService: NewsApiService) {}

  ngOnInit(): void {
    this.getTopHeadlines();
    this.getRecentNews(this.currentPage);
    this.getPopularPosts(this.popularCurrentPage);
    this.getEditorPicks(this.editorPicksCurrentPage);
    this.getTrendingPosts(this.trendingPostsCurrentPage);
  }

  getTopHeadlines() {
    this.newsApiService.getTopHeadlines().subscribe(
      (data) => {
        this.newsData = data;
        this.trendingArticles = this.getTrendingArticles(data.articles, 3);
      },
    );
  }

  getTrendingArticles(articles: any[], count: number): any[] {
    const articlesWithImages = articles.filter(article => article.urlToImage);
    const sortedByPopularity = articlesWithImages.sort((a, b) => b.popularity - a.popularity);
    return sortedByPopularity.slice(0, count);
  }

  getRecentNews(page: number) {
    this.newsApiService.getRecentNews(page).subscribe(
      (data) => {
        this.recentArticles = data.articles.slice(0, this.pageSize);
  
      },
    );
  }


  getPopularPosts(page: number) {
    this.newsApiService.getPopularPosts(page).subscribe(
      (data) => {
        this.popularArticles = data.articles.slice(0, this.pageSize);
      },
    );
  }

  getEditorPicks(page: number) {
    this.newsApiService.getEditorPicks(page).subscribe(
      (data) => {
        this.editorPicks = data.articles.slice(0, this.pageSize);
      },
    );
  }

  getTrendingPosts(page: number) {
    this.newsApiService.getTrendingPosts(page).subscribe(
      (data) => {
        this.trendingPosts = data.articles.slice(0, this.pageSize);
      },
    );
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.trendingArticles.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.trendingArticles.length) % this.trendingArticles.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.getRecentNews(this.currentPage);
  }

  goToPopularPage(page: number) {
    this.popularCurrentPage = page;
    this.getPopularPosts(this.popularCurrentPage);
  }

  goToEditorPicksPage(page: number) {
    this.editorPicksCurrentPage = page;
    this.getEditorPicks(this.editorPicksCurrentPage);
  }

  goToTrendingPostsPage(page: number) {
    this.trendingPostsCurrentPage = page;
    this.getTrendingPosts(this.trendingPostsCurrentPage);
  }


  scrollTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }




}
