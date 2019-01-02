import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { Delete } from "../../elements";
import { ModalContext, ModalContextValue } from "./modal-context";

export type ModalCardHeadProps = HelpersProps;

const mapChildren = (
  children: React.ReactNode,
  setActive: ModalContextValue["setActive"],
) =>
  React.Children.map(children, (child, i) => {
    if (typeof child === "object") {
      if (child.type === Delete) {
        return React.cloneElement(child, {
          onClick: (event: React.MouseEvent<any>) => {
            if (child.props.onClick) {
              child.props.onClick(event);
            }
            setActive(false);
          },
        });
      } else if (child.type === React.Fragment) {
        return (
          <React.Fragment
            children={mapChildren(child.props.children, setActive)}
          />
        );
      }
    }
    return child;
  });

export const ModalCardHead = forwardRefAs<ModalCardHeadProps, "header">(
  ({ className, children, ...rest }, ref) => (
    <ModalContext.Consumer>
      {({ setActive }) => (
        <Generic
          children={mapChildren(children, setActive)}
          className={classNames("modal-card-head", className)}
          ref={ref}
          {...rest}
        />
      )}
    </ModalContext.Consumer>
  ),
  { as: "header" },
);
