import React from "react";

export type AsExoticComponentProps<
  TOwnProps,
  TRenderAs extends React.ComponentType<any> | keyof JSX.IntrinsicElements
> = TOwnProps &
  Omit<React.ComponentPropsWithRef<TRenderAs>, keyof TOwnProps> & {
    as?: TRenderAs;
  };

export type AsExoticComponent<
  TOwnProps,
  TDefaultElement extends React.ComponentType<any> | keyof JSX.IntrinsicElements
> = React.ForwardRefExoticComponent<
  AsExoticComponentProps<TOwnProps, TDefaultElement>
> &
  (<
    TAsElement extends
      | React.ComponentType<any>
      | keyof JSX.IntrinsicElements = TDefaultElement
  >(
    props: AsExoticComponentProps<TOwnProps, TAsElement>,
  ) => JSX.Element | null);

export function asExoticComponent<
  TOwnProps,
  TDefaultElement extends React.ComponentType<any> | keyof JSX.IntrinsicElements
>(
  factory: React.RefForwardingComponent<
    any,
    Omit<AsExoticComponentProps<TOwnProps, TDefaultElement>, "ref">
  >,
  defaultElement: TDefaultElement,
) {
  const forward = React.forwardRef(factory);
  // https://github.com/Microsoft/TypeScript/issues/28614
  // apparently a bug, use workaround
  // forward.defaultProps = { as: defaultElement };
  forward.defaultProps = {};
  forward.defaultProps.as = defaultElement;
  // React.RefForwardingComponent is mistyped:
  // it doesn't exclude `ref` from `props`.
  return (forward as unknown) as AsExoticComponent<TOwnProps, TDefaultElement>;
}
