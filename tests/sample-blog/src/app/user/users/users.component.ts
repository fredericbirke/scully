import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { isScullyGenerated, TransferStateService } from '@scullyio/ng-lib';
import { of } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs';
import { User } from '../user.component.js';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  private http = inject(HttpClient);
  private transferState = inject(TransferStateService);

  apiUsers$ = this.http.get<User[]>(`/api/users`).pipe(
    catchError(() => of([] as User[])),
    map((users) => users.slice(0, 10)),
    shareReplay(1),
  );

  // This is an example of using TransferState
  users$ = isScullyGenerated()
    ? this.transferState.getState<User[]>('users')
    : this.apiUsers$.pipe(tap((user) => this.transferState.setState('users', user)));
}
