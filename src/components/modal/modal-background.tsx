import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { ModalContext } from "./modal-context";

export type ModalBackgroundModifierProps = Partial<{
  onClick: React.MouseEventHandler<any>;
}>;

export type ModalBackgroundProps = HelpersProps & ModalBackgroundModifierProps;

const propTypes = {
  onClick: PropTypes.func,
};

export const ModalBackground = Object.assign(
  forwardRefAs<ModalBackgroundProps, "div">(
    ({ className, onClick, ...rest }, ref) => (
      <ModalContext.Consumer>
        {({ close, closeOnBlur }) => (
          <Generic
            className={classNames("modal-background", className)}
            onClick={(event: React.MouseEvent) => {
              if (onClick) {
                onClick(event);
              }
              if (closeOnBlur) {
                close();
              }
            }}
            ref={ref}
            role="presentation"
            {...rest}
          />
        )}
      </ModalContext.Consumer>
    ),
    { as: "div" },
  ),
  { propTypes },
);
