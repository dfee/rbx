import React from "react";

export type Lit = string | number | boolean | undefined | null | void | {};
export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
export type Prefer<P, T> = P & Omit<T, keyof P>;
// tslint:disable-next-line: no-any
export type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

/**
 * Map a React.ReactType "T" to it's real type:
 *   a keyof JSX.IntrinsicElements ==> the specific HTMLElemnt or SVGElement
 *   a React.ComponentType<any> ==> the Function, or Class Component signature
 *
 * For example:
 *   ElementTypeFromReactType<"div"> ==> HTMLDivElement
 *   ElementTypeFromReactType<"svg"> ==> SVGSVGElement
 *   ElementTypeFromReactType<"circle"> ==> SVGCircleElement
 *   ElementTypeFromReactType<React.FC<P>> ==> React.FC<P>
 */
export type ElementTypeFromReactType<
  T extends React.ReactType
> = T extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[T] extends React.DetailedHTMLProps<
      React.HTMLAttributes<infer U>,
      infer U
    >
    ? U
    : JSX.IntrinsicElements[T] extends React.SVGProps<infer V>
    ? V
    : never
  : T;

/**
 * Map an HTMLElement, SVGElement, or ComponentType "T" to it's React.ReactType
 * (i.e. for React.createElement or React.createRef)
 *
 * For example:
 *   ReactTypeFromElementType<HTMLDivElement> ==> "div" (or anything that shares its interface)
 *   ReactTypeFromElementType<SVGSVGElement> ==> "svg"
 *   ReactTypeFromElementType<SVGCircleElement> ==> "circle"
 *   ReactTypeFromElementType<React.FC<P>> ==> React.FC<P>
 */
export type AllowedNames<Base, Condition> = {
  [K in keyof Base]: Base[K] extends Condition ? K : never
}[keyof Base];

export type SimpleJSXIntrinsicElementMapping = {
  [K in keyof JSX.IntrinsicElements]: JSX.IntrinsicElements[K] extends React.DetailedHTMLProps<
    React.HTMLAttributes<infer U>,
    infer U
  >
    ? U
    : JSX.IntrinsicElements[K] extends React.SVGProps<infer V>
    ? V
    : never
};

export type ReactTypeFromElementType<
  T extends React.ComponentType | HTMLElement | SVGElement
> = T extends HTMLElement | SVGElement
  ? AllowedNames<SimpleJSXIntrinsicElementMapping, T>
  : T;
