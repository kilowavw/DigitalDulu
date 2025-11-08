
import * as React from 'react';

// This file augments the global JSX namespace to include custom and standard HTML/SVG elements.
// This is done in a dedicated .d.ts file to ensure it's picked up by the TypeScript compiler
// for all files using JSX, preventing "Property 'ion-icon' does not exist on type 'JSX.IntrinsicElements'"
// and similar errors for standard HTML/SVG elements if `@types/react` intrinsic elements
// are not being correctly picked up or merged in the build environment.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Custom element for Ionicons
      'ion-icon': { name: string } & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

      // Explicitly adding common HTML elements, as a workaround if @types/react intrinsic elements
      // are not being correctly picked up or merged by the TypeScript compiler in this environment.
      // This is generally not required in a standard React setup, where @types/react handles these globally.
      div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
      main: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      a: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
      button: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
      span: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
      img: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
      h2: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      p: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
      footer: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      section: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      h3: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      br: React.DetailedHTMLProps<React.HTMLAttributes<HTMLBRElement>, HTMLBRElement>;

      // Explicitly adding common SVG elements, if @types/react SVG intrinsic elements
      // are also not being correctly picked up or merged.
      svg: React.DetailedHTMLProps<React.SVGAttributes<SVGSVGElement>, SVGSVGElement>;
      defs: React.DetailedHTMLProps<React.SVGProps<SVGDefsElement>, SVGDefsElement>;
      pattern: React.DetailedHTMLProps<React.SVGProps<SVGPatternElement>, SVGPatternElement>;
      path: React.DetailedHTMLProps<React.SVGProps<SVGPathElement>, SVGPathElement>;
      rect: React.DetailedHTMLProps<React.SVGProps<SVGRectElement>, SVGRectElement>;
      linearGradient: React.DetailedHTMLProps<React.SVGProps<SVGLinearGradientElement>, SVGLinearGradientElement>;
      stop: React.DetailedHTMLProps<React.SVGProps<SVGStopElement>, SVGStopElement>;
    }
  }
}
