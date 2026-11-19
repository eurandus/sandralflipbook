// Minimal type definitions for the parts of `page-flip` this project uses.
declare module "page-flip" {
  export type FlipState = "user_fold" | "fold_corner" | "flipping" | "read";
  export type Orientation = "portrait" | "landscape";

  export interface FlipSettings {
    width: number;
    height: number;
    size?: "fixed" | "stretch";
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    drawShadow?: boolean;
    flippingTime?: number;
    usePortrait?: boolean;
    startZIndex?: number;
    autoSize?: boolean;
    maxShadowOpacity?: number;
    showCover?: boolean;
    mobileScrollSupport?: boolean;
    clickEventForward?: boolean;
    useMouseEvents?: boolean;
    swipeDistance?: number;
    showPageCorners?: boolean;
    disableFlipByClick?: boolean;
    startPage?: number;
  }

  export interface FlipEvent<T> {
    data: T;
    object: PageFlip;
  }

  export class PageFlip {
    constructor(element: HTMLElement, settings: FlipSettings);
    loadFromHTML(items: HTMLElement[]): void;
    destroy(): void;
    update(): void;
    flipNext(corner?: "top" | "bottom"): void;
    flipPrev(corner?: "top" | "bottom"): void;
    flip(page: number, corner?: "top" | "bottom"): void;
    turnToPage(page: number): void;
    getCurrentPageIndex(): number;
    getPageCount(): number;
    getOrientation(): Orientation;
    getState(): FlipState;
    getRender(): { getRect(): { left: number; top: number; width: number; height: number; pageWidth: number } };
    on(event: "flip", cb: (e: FlipEvent<number>) => void): this;
    on(event: "changeState", cb: (e: FlipEvent<FlipState>) => void): this;
    on(event: "changeOrientation", cb: (e: FlipEvent<Orientation>) => void): this;
    on(event: "init" | "update", cb: (e: FlipEvent<{ page: number; mode: Orientation }>) => void): this;
  }
}
