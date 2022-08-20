import { BehaviorSubject, map, Observable, shareReplay, switchMap } from 'rxjs';
import { Article } from './../../interfaces/article';
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  articles: Article[] = [];
  displayArticles = false;
  articles$: Observable<Article[]> = this.postService.getArticles().pipe(
    map((result) => result.articles),
    shareReplay(1)
  );
  refresh$ = new BehaviorSubject(null);
  mutipleRequest$ = this.refresh$.pipe(
    switchMap((data) =>
      this.postService
        .getArticles()
        .pipe(map((result) => ({ api1: data, api2: result })))
    )
  );
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    // this.postService.getArticles().subscribe((result) => {
    //   this.articles = result.articles;
    // });
  }
  refresh() {
    this.refresh$;
  }
}
