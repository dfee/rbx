import * as React from "react";

import { Prefer } from "src/types";

export interface ForwardRefAsExoticComponent<
  TOwnProps,
  TDefaultComponent extends React.ReactType
>
  extends Pick<
    React.ForwardRefExoticComponent<TDefaultComponent>,
    keyof React.ForwardRefExoticComponent<TDefaultComponent>
  > {
  <
    TAsComponent extends
      | React.ReactType
      // tslint:disable-next-line: no-any
      | ForwardRefAsExoticComponent<any, any> = TDefaultComponent
  >(
    props: Prefer<
      // tslint:disable-next-line:no-reserved-keywords
      React.PropsWithoutRef<TOwnProps & { as?: TAsComponent }>,
      // React.ComponentPropsWithRef<TAsComponent>
      // tslint:disable-next-line: no-any
      TAsComponent extends ForwardRefAsExoticComponent<infer P, any>
        ? P
        : React.ComponentPropsWithRef<TAsComponent>
    >,
  ): JSX.Element | null;
}

export function forwardRefAs<
  TOwnProps,
  TDefaultElement extends React.ReactType
>(
  factory: React.RefForwardingComponent<
    TDefaultElement,
    // tslint:disable-next-line:no-reserved-keywords
    TOwnProps & { as?: React.ReactType }
  >,
  defaultProps: Partial<
    Prefer<
      // tslint:disable-next-line:no-reserved-keywords
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
