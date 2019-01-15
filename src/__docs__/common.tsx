import React from "react";

import { Generic } from "src/base";
import { PropDoc } from "./simple-props-table";

type AsPropProps = {
  // tslint:disable-next-line: no-any
  component: React.ComponentType<any>;
  componentName?: string;
  defaultValue?: string;
};

export const asDoc = (defaultValue: string): PropDoc => ({
  defaultValue,
  description:
    'the React Component or JSX Element (e.g. "div" or "span") to render as',
  typeName: "ReactType",
});

export const AsProp: React.FC<AsPropProps> = Object.assign(
  (props: AsPropProps) => {
    const componentName =
      props.componentName !== undefined
        ? props.componentName
        : props.component.displayName;
    const defaultValue =
      props.defaultValue !== undefined
        ? props.defaultValue
        : props.component.defaultProps !== undefined &&
          props.component.defaultProps.as !== undefined
        ? `${props.component.defaultProps.as}`
        : "div";

    const componentTag = `<${componentName}>`;

    return (
      <div className="notification">
        <h5 className="title is-5">
          Additional Props for <code>{componentTag}</code>
        </h5>
        <code>{componentTag}</code> accepts the <code>as</code> prop – meaning
        it wraps another React Component or JSX Element. Therefore, it also
        accepts <em>all</em> props that <code>{defaultValue}</code> accepts (its
        default <code>as</code> prop value). Alternatively, you may pass a
        different React Component or JSX Element, and{" "}
        <code>{componentTag}</code> will accept its props instead.
        {props.component === Generic ? (
          undefined
        ) : (
          <React.Fragment>
            <br />
            <br />
            In addition, <code>{componentTag}</code> also accepts <em>all</em>{" "}
            props supported by{" "}
            <a href="/rbx/base/generic">
              <code>{"<Generic>"}</code>
            </a>
            .
          </React.Fragment>
        )}
      </div>
    );
  },
  { makeDoc: asDoc },
);

export const refDoc = {
  description: "a handle to the underlying React Component or JSX Element",
  typeName: "React.RefObject",
};
