import { Browser } from 'puppeteer';
import { Observable } from 'rxjs';
/**
 * Returns an Observable with that will fire with the launched puppeteer in there.
 */
export declare const launchedBrowser$: Observable<Browser>;
export declare const launchedBrowser: () => Promise<Browser>;
export declare let browser: Browser;
/** ICE relaunch puppeteer. */
export declare const reLaunch: (reason?: string) => Promise<Browser>;
