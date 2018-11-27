import * as React from "react";

export interface RenderAsExoticComponent<
  TOwnProps,
  TDefaultComponent extends
    | keyof JSX.IntrinsicElements
    | React.ComponentType<any>
>
  extends Pick<
    React.ForwardRefExoticComponent<any>,
    keyof React.ForwardRefExoticComponent<any>
  > {
  (
    props: React.ComponentPropsWithRef<TDefaultComponent> &
      TOwnProps & { renderAs?: never },
  ): JSX.Element | null;
  <TAsComponent extends keyof JSX.IntrinsicElements | React.ComponentType<any>>(
    props: React.ComponentPropsWithRef<TAsComponent> &
      TOwnProps & { renderAs: TAsComponent },
  ): JSX.Element | null;
}

export function renderAsExoticComponent<
  TOwnProps,
  TDefaultElement extends React.ComponentType<any> | keyof JSX.IntrinsicElements
>(
  factory: React.RefForwardingComponent<
    any,
    TOwnProps & {
      renderAs?: React.ComponentType<any> | keyof JSX.IntrinsicElements;
      className?: string;
    }
  >,
  defaultElement: TDefaultElement,
) {
  const forward = React.forwardRef(factory);
  // https://github.com/Microsoft/TypeScript/issues/28614
  // apparently a bug, use workaround
  // forward.defaultProps = { renderAs: defaultElement };
  forward.defaultProps = {};
  forward.defaultProps.renderAs = defaultElement;
  return forward as RenderAsExoticComponent<TOwnProps, TDefaultElement>;
}
