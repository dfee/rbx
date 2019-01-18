import React from "react";

import { Prefer } from "../types";

// tslint:disable:no-any
// tslint:disable:no-reserved-keywords

export type ForwardRefAsExoticComponent<
  TOwnProps,
  TDefaultComponent extends React.ReactType
> = Pick<
  React.ForwardRefExoticComponent<TDefaultComponent>,
  Exclude<
    keyof React.ForwardRefExoticComponent<TDefaultComponent>,
    "defaultProps"
  >
> & {
  <TAsComponent extends React.ReactType = TDefaultComponent>(
    props: Prefer<
      React.PropsWithoutRef<TOwnProps & { as?: TAsComponent }>,
      React.ComponentPropsWithRef<TAsComponent>
    >,
  ): JSX.Element | null;
  defaultProps: {
    as: TDefaultComponent;
  } & Partial<TOwnProps & React.ComponentPropsWithoutRef<TDefaultComponent>>;
  displayName: string;
  propTypes: React.WeakValidationMap<
    {
      [k in
        | "as"
        | keyof TOwnProps
        | keyof React.ComponentPropsWithoutRef<TDefaultComponent>]: any
    }
  >;
};

export function forwardRefAs<
  TOwnProps,
  TDefaultElement extends React.ReactType
>(
  factory: React.RefForwardingComponent<
    TDefaultElement,
    TOwnProps & { as: React.ReactType }
  >,
  defaultProps: Partial<
    Prefer<
      React.PropsWithoutRef<TOwnProps & { as: TDefaultElement }> &
        React.RefAttributes<TDefaultElement>,
      React.ComponentPropsWithoutRef<TDefaultElement>
    >
  >,
) {
  const forward = React.forwardRef(factory);
  forward.defaultProps = defaultProps;

  return forward as ForwardRefAsExoticComponent<TOwnProps, TDefaultElement>;
}
