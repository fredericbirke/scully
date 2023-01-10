declare global {
    interface Window {
        ScullyIO: string | undefined;
        scullyVersion: string | undefined;
        "ScullyIO-injected": string | undefined;
        onCustomEvent: (...args: any[]) => unknown;
    }
}
export {};
