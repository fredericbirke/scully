import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isScullyGenerated, TransferStateService } from '@scullyio/ng-lib';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, pluck, shareReplay, switchMap, tap } from 'rxjs';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private transferState = inject(TransferStateService);

  userId$: Observable<number> = this.route.params.pipe(
    map((param: { [key: string]: string | undefined }) => param['id']),
    filter((val: any) => !!(val != null)),
    map((val: string) => parseInt(val, 10)),
    shareReplay(1),
  );

  apiPosts$ = this.userId$.pipe(
    switchMap((id) =>
      this.http.get<Post[]>(`/api/posts?userId=${id}`).pipe(
        catchError(() =>
          of([
            {
              id,
              title: 'not found',
            },
          ] as Post[]),
        ),
      ),
    ),
    shareReplay(1),
  );

  // This is an example of using TransferState
  posts$: Observable<Post[]> = isScullyGenerated()
    ? this.transferState.getState('posts')
    : this.apiPosts$.pipe(tap((posts) => this.transferState.setState('posts', posts)));

  ngOnInit() {}
}
