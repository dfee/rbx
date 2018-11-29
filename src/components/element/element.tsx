import * as React from "react";

import { ModifierProps, modify } from "@/modifiers";

export type ForwardRefExoticComponentProps<
  TOwnProps,
  TRenderAs extends React.ComponentType<any> | keyof JSX.IntrinsicElements
> = TOwnProps &
  Omit<React.ComponentPropsWithRef<TRenderAs>, keyof TOwnProps> & {
    as?: TRenderAs;
  };

export type ExtendedForwardRefExoticComponent<
  TOwnProps,
  TDefaultElement extends React.ComponentType<any> | keyof JSX.IntrinsicElements
> = React.ForwardRefExoticComponent<
  ForwardRefExoticComponentProps<TOwnProps, TDefaultElement>
> &
  React.RefAttributes<any> &
  (<
    TAsElement extends
      | React.ComponentType<any>
      | keyof JSX.IntrinsicElements = TDefaultElement
  >(
    props: React.PropsWithoutRef<
      ForwardRefExoticComponentProps<TOwnProps, TAsElement> &
        React.RefAttributes<any>
    >,
  ) => JSX.Element | null);

export function extendedForwardRef<
  TOwnProps,
  TDefaultElement extends React.ComponentType<any> | keyof JSX.IntrinsicElements
>(
  factory: React.RefForwardingComponent<
    any,
    ForwardRefExoticComponentProps<TOwnProps, TDefaultElement>
  >,
  defaultElement: TDefaultElement,
) {
  const forward = React.forwardRef(factory);
  // https://github.com/Microsoft/TypeScript/issues/28614
  // apparently a bug, use workaround
  // forward.defaultProps = { as: defaultElement };
  forward.defaultProps = {};
  forward.defaultProps.as = defaultElement;
  return forward as ExtendedForwardRefExoticComponent<
    TOwnProps,
    TDefaultElement
  >;
}

export type ElementProps = ModifierProps;

export const Element = extendedForwardRef<ElementProps, "div">(
  ({ as, ...props }, ref) => {
    const x = props.ref; // todo!
    return React.createElement(as!, { ref, ...modify(props) });
  },
  "div",
);

const myRef = React.createRef<HTMLDivElement>();
const E = <Element ref={myRef} />;
