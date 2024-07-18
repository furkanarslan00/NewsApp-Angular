import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsApiService } from '../../service/news.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';
  searchResults: any[] = [];
  currentSearchPage: number = 1;
  pageSize: number = 5; 

  constructor(private route: ActivatedRoute, private newsApiService: NewsApiService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'] || '';
      if (this.searchQuery) {
        this.fetchSearchResults();
      }
    });
  }

  fetchSearchResults() {
    this.newsApiService.searchNews(this.searchQuery, this.currentSearchPage).subscribe(response => {
      this.searchResults = response.articles;
    });
  }

  goToPage(route: string, page: number) {
    if (page < 1) {
      page = 1;
    }
    this.currentSearchPage = page;
    this.fetchSearchResults();
  }

  scrollTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }




}
