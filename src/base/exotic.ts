import React from "react";

import { Prefer } from "../types";

// tslint:disable:no-reserved-keywords

/**
 * Maps a keyof JSX.IntrinsicElement (e.g. 'div' or 'svg') or a
 * React.ComponentType to it's type.
 *
 * For example:
 *   FromReactType<"div"> ==> HTMLDivElement
 *   FromReactType<"svg"> ==> SVGSVGElement
 *   FromReactType<React.FC<P>. ==> React.FC<P>
 */
export type FromReactType<
  T extends React.ReactType
> = T extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[T] extends React.DetailedHTMLFactory<
      React.HTMLAttributes<infer U>,
      infer U
    >
    ? U
    : JSX.IntrinsicElements[T] extends React.SVGProps<infer V>
    ? V
    : never
  : T;

export type ForwardRefAsExoticComponent<
  TOwnProps,
  TDefaultElementType extends React.ReactType
> = Pick<
  React.ForwardRefExoticComponent<TDefaultElementType>,
  Exclude<
    keyof React.ForwardRefExoticComponent<TDefaultElementType>,
    "defaultProps"
  >
> & {
  <TAsComponent extends React.ReactType = TDefaultElementType>(
    props: Prefer<
      { as?: TAsComponent } & TOwnProps,
      React.ComponentProps<TAsComponent>
    > &
      React.RefAttributes<
        TAsComponent extends keyof JSX.IntrinsicElements
          ? FromReactType<TAsComponent>
          : TAsComponent
      >,
  ): JSX.Element | null;
  defaultProps: {
    as: TDefaultElementType;
  } & Partial<TOwnProps & React.ComponentPropsWithoutRef<TDefaultElementType>>;
  displayName: string;
  propTypes: React.WeakValidationMap<
    {
      [k in
        | "as"
        | keyof TOwnProps
        // tslint:disable-next-line:no-any
        | keyof React.ComponentPropsWithoutRef<TDefaultElementType>]: any
    }
  >;
};

export function forwardRefAs<
  TDefaultElement extends HTMLElement | SVGElement | React.ComponentType,
  TOwnProps,
  TDefaultElementType extends React.ReactType = React.ReactType
>(
  factory: React.RefForwardingComponent<
    HTMLElement | SVGElement | React.ComponentType,
    TOwnProps & { as: React.ReactType }
  >,
  defaultProps: Partial<
    Prefer<
      React.PropsWithoutRef<TOwnProps & { as: TDefaultElementType }> &
        React.RefAttributes<TDefaultElement>,
      React.ComponentPropsWithoutRef<TDefaultElementType>
    >
  >,
) {
  const forward = React.forwardRef(factory);
  forward.defaultProps = defaultProps;

  return forward as ForwardRefAsExoticComponent<TOwnProps, TDefaultElementType>;
}
