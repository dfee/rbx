import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { ModalContext } from "./modal-context";

export type ModalCloseModifierProps = Partial<{
  onClick: React.MouseEventHandler<any>;
}>;

export type ModalCloseProps = HelpersProps & ModalCloseModifierProps;

const propTypes = {
  onClick: PropTypes.func,
};

export const ModalClose = Object.assign(
  forwardRefAs<ModalCloseProps, "button">(
    ({ className, onClick, ...rest }, ref) => (
      <ModalContext.Consumer>
        {({ close }) => (
          <Generic
            aria-label="close"
            className={classNames("modal-close", "is-large", className)}
            onClick={(event: React.MouseEvent<any>) => {
              if (onClick) {
                onClick(event);
              }
              close();
            }}
            ref={ref}
            {...rest}
          />
        )}
      </ModalContext.Consumer>
    ),
    { as: "button" },
  ),
  { propTypes },
);
