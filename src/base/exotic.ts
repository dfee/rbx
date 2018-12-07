import React from "react";

export interface ForwardRefAsExoticComponent<
  TOwnProps,
  TDefaultComponent extends React.ReactType<any>
>
  extends Pick<
    React.ForwardRefExoticComponent<any>,
    keyof React.ForwardRefExoticComponent<any>
  > {
  <TAsComponent extends React.ReactType<any>>(
    props: Prefer<
      React.PropsWithoutRef<TOwnProps & { as: TAsComponent }>,
      React.ComponentPropsWithRef<TAsComponent>
    >,
  ): React.ReactElement<any> | null;
  (
    props: Prefer<
      React.PropsWithoutRef<TOwnProps & { as?: never }>,
      React.ComponentPropsWithRef<TDefaultComponent>
    >,
  ): React.ReactElement<any> | null;
}

export function forwardRefAs<
  TOwnProps,
  TDefaultElement extends React.ReactType<any>
>(
  factory: React.RefForwardingComponent<
    any,
    TOwnProps & { as?: React.ReactType<any> }
  >,
  defaultProps: Partial<
    Prefer<
      React.PropsWithoutRef<TOwnProps & { as: TDefaultElement }> &
        React.RefAttributes<any>,
      React.ComponentPropsWithoutRef<TDefaultElement>
    >
  >,
) {
  const forward = React.forwardRef(factory);
  forward.defaultProps = defaultProps;
  return forward as ForwardRefAsExoticComponent<TOwnProps, TDefaultElement>;
}
