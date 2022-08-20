import { Article } from './../../../interfaces/article';
import { PostService } from './../../../post.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, Observable } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  article?: Article;
  article$: Observable<Article> = this.route.paramMap.pipe(
    map((params) => params.get('id') || ''),
    switchMap((id) => this.postService.getArticle(id)),
    map((result) => result.article)
  );
  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    // this.route.paramMap.pipe(
    //   map(parm=>parm.get('id')||''),
    //   switchMap(id=>this.postService.getArticle(id))
    // ).subscribe(result=>{
    //   this.article=result.article;
    // })
  }
}
