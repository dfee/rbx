import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";
import { Delete } from "src/elements";
import { ModalContext, ModalContextValue } from "./modal-context";

export type ModalCardHeadProps = HelpersProps;

const mapChildren = (
  children: React.ReactNode,
  close: ModalContextValue["close"],
) =>
  React.Children.map(children, (child, i) => {
    if (typeof child === "object") {
      if (child.type === Delete) {
        const onClick = (child.props as React.HTMLAttributes<Element>).onClick;

        return React.cloneElement(child, {
          onClick: (event: React.MouseEvent) => {
            if (onClick !== undefined) {
              onClick(event);
            }
            close();
          },
        });
      } else if (child.type === React.Fragment) {
        return (
          <React.Fragment
            children={mapChildren(
              (child.props as React.ComponentPropsWithoutRef<
                typeof React.Fragment
              >).children,
              close,
            )}
          />
        );
      }
    }

    return child;
  });

export const ModalCardHead = forwardRefAs<ModalCardHeadProps, "header">(
  ({ className, children, ...rest }, ref) => (
    <ModalContext.Consumer>
      {({ close }) => (
        <Generic
          children={mapChildren(children, close)}
          className={classNames("modal-card-head", className)}
          ref={ref}
          {...rest}
        />
      )}
    </ModalContext.Consumer>
  ),
  { as: "header" },
);
