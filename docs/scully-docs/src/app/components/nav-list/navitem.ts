import { Component, ElementRef, inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NavListService } from './nav-list.service.js';

@Component({
  selector: 'ul.sideMenu',
  encapsulation: ViewEncapsulation.None,
  template: `
    <li *ngFor="let link of navItem.inOrder || []">
      <a
        [style.paddingLeft.px]="getDepth()"
        [class.header]="header(link)"
        [class.active]="checkLink(link)"
        [routerLink]="link._route.route"
        >{{ link._route.title || link._route.route }}</a
      >
      <ul
        *ngIf="checkRoute(link) && link.inOrder"
        [class.isHeader]="header(link)"
        class="sideMenu"
        [navItem]="link"
      ></ul>
    </li>
  `,
})
export class NavItemComponent implements OnInit {
  private navService = inject(NavListService);
  private elmRef = inject(ElementRef);
  private rs = inject(Router);
  elm = this.elmRef.nativeElement;
  @Input() navItem: any;
  showChild = false;
  ngOnInit() {
    /** put in safeguard option. */
    if (!this.navItem) {
      this.navItem = { inOrder: [] };
    }
  }

  checkLink(link: { inOrder: string | any[] }) {
    return this.checkRoute(link) && link.inOrder.length === 0;
  }

  header(link: { inOrder: string | any[] }) {
    return this.checkRoute(link) && link && link.inOrder && link.inOrder.length > 0;
  }

  checkRoute(route: { inOrder?: string | any[]; _route?: any }) {
    if (window && route?._route?.route) {
      const search = `overview${route._route.lang === 'en' ? '' : '_' + route._route.lang}`;
      return location.pathname.includes(route._route.route.replace(search, ''));
    }
    return false;
  }

  getDepth() {
    let depth = 0;
    let elm = this.elm as HTMLUListElement;
    while (elm.tagName === 'UL') {
      depth += 1;
      elm = elm.parentElement?.parentElement as HTMLUListElement;
    }
    return depth * 16;
  }
}
