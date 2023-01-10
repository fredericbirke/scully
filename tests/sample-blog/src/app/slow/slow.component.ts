import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { isScullyGenerated } from '@scullyio/ng-lib';
import { first } from 'rxjs';

@Component({
  selector: 'app-slow',
  template: `
    <p>slow works!</p>
    <h1 *ngIf="!isGenerated">Scully Not Generated</h1>
    <h1 *ngIf="isGenerated">Scully Generated</h1>
  `,
  styles: [``]
})
export class SlowComponent {
  /** injections */
  private http= inject(HttpClient)


  isGenerated = isScullyGenerated();

  delay$ = this.http.get('/api/slow/2000');

  constructor() {
    this.delay$.pipe(first()).subscribe();
  }
}
