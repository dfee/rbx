import React from "react";

export type ForwardRefAsExoticComponentProps<
  TOwnProps,
  TAsComponent extends React.ComponentType<any> | keyof JSX.IntrinsicElements
> = Prefer<TOwnProps, React.ComponentPropsWithRef<TAsComponent>> & {
  as?: TAsComponent;
};

export type ForwardRefAsExoticComponent<
  TOwnProps,
  TDefaultAsComponent extends
    | React.ComponentType<any>
    | keyof JSX.IntrinsicElements
> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<
    ForwardRefAsExoticComponentProps<TOwnProps, TDefaultAsComponent>
  >
> &
  (<
    TAsComponent extends
      | React.ComponentType<any>
      | keyof JSX.IntrinsicElements = TDefaultAsComponent
  >(
    props: ForwardRefAsExoticComponentProps<TOwnProps, TAsComponent>,
  ) => React.ReactElement<any> | null);

export function forwardRefAs<
  TOwnProps,
  TDefaultAsComponent extends
    | React.ComponentType<any>
    | keyof JSX.IntrinsicElements
>(
  factory: React.RefForwardingComponent<
    any,
    React.PropsWithoutRef<
      ForwardRefAsExoticComponentProps<TOwnProps, TDefaultAsComponent>
    >
  >,
  defaultElement: TDefaultAsComponent,
) {
  const forward = React.forwardRef(factory) as ForwardRefAsExoticComponent<
    TOwnProps,
    TDefaultAsComponent
  >;
  // https://github.com/Microsoft/TypeScript/issues/28614
  // apparently a bug, use workaround
  // forward.defaultProps = { as: defaultElement };
  forward.defaultProps = {};
  forward.defaultProps.as = defaultElement;
  return forward;
}
