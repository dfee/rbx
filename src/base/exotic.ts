import React from "react";

import { Prefer } from "../types";
import { TransformFunc } from "./helpers";

export interface ForwardRefAsExoticComponent<
  TOwnProps,
  TDefaultAsComponent extends React.ReactType<any>,
  TDefaultTransformProps
>
  extends Pick<
    React.ForwardRefExoticComponent<any>,
    keyof React.ForwardRefExoticComponent<any>
  > {
  /** Override transform */
  <TTransformProps>(
    props: Prefer<
      React.PropsWithoutRef<
        TOwnProps &
          TTransformProps & {
            as?: never;
            transform: TransformFunc<TTransformProps>;
          }
      >,
      React.ComponentPropsWithRef<TDefaultAsComponent>
    >,
  ): React.ReactElement<any> | null;
  /** Override component type */
  <TAsComponent extends React.ReactType<any>>(
    props: Prefer<
      React.PropsWithoutRef<
        TOwnProps &
          TDefaultTransformProps & { as: TAsComponent; transform?: never }
      >,
      React.ComponentPropsWithRef<TAsComponent>
    >,
  ): React.ReactElement<any> | null;
  /** Override component type & transform */
  <TAsComponent extends React.ReactType<any>, TTransformProps>(
    props: Prefer<
      React.PropsWithoutRef<
        TOwnProps &
          TTransformProps & {
            as: TAsComponent;
            transform: TransformFunc<TTransformProps>;
          }
      >,
      React.ComponentPropsWithRef<TAsComponent>
    >,
  ): React.ReactElement<any> | null;
  /** default (no override) */
  (
    props: Prefer<
      React.PropsWithoutRef<
        TOwnProps & TDefaultTransformProps & { as?: never; transform?: never }
      >,
      React.ComponentPropsWithRef<TDefaultAsComponent>
    >,
  ): React.ReactElement<any> | null;
}

export function forwardRefAs<
  TOwnProps,
  TDefaultElement extends React.ReactType<any>,
  TDefaultTransformProps
>(
  factory: React.RefForwardingComponent<
    any,
    TOwnProps & { as?: React.ReactType<any>; transform?: TransformFunc<any> }
  >,
  defaultProps: Partial<
    Prefer<
      React.PropsWithoutRef<
        TOwnProps & {
          as: TDefaultElement;
          transform: TransformFunc<TDefaultTransformProps>;
        }
      > &
        React.RefAttributes<any>,
      React.ComponentPropsWithoutRef<TDefaultElement>
    >
  >,
) {
  const forward = React.forwardRef(factory);
  forward.defaultProps = defaultProps;
  return forward as ForwardRefAsExoticComponent<
    TOwnProps,
    TDefaultElement,
    TDefaultTransformProps
  >;
}
