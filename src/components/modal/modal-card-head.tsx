import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Delete } from "../../elements";

import { ModalContextValue, useModal } from "./modal-context";

export type ModalCardHeadProps = HelpersProps;

const mapChildren = (
  children: React.ReactNode,
  close: ModalContextValue["close"],
): React.ReactNode =>
  React.Children.map(children, child => {
    if (typeof child === "object" && child !== null && "type" in child) {
      if (child.type === Delete) {
        const { onClick } = child.props as React.HTMLAttributes<Element>;

        return React.cloneElement(child, {
          onClick: (event: React.MouseEvent) => {
            if (onClick !== undefined) {
              onClick(event);
            }
            close();
          },
        });
      }
      if (child.type === React.Fragment) {
        return (
          <>
            {mapChildren(
              (child.props as React.ComponentPropsWithoutRef<
                typeof React.Fragment
              >).children,
              close,
            )}
          </>
        );
      }
    }

    return child;
  });

export const ModalCardHead = forwardRefAs<ModalCardHeadProps>(
  ({ className, children, ...rest }, ref) => {
    const { close } = useModal();
    return (
      <Generic
        ref={ref}
        className={classNames("modal-card-head", className)}
        {...rest}
      >
        {mapChildren(children, close)}
      </Generic>
    );
  },
  { as: "header" },
);

ModalCardHead.displayName = "Modal.Card.Head";
