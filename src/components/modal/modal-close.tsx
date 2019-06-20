import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useCallback } from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { useModal } from "./modal-context";

export type ModalCloseModifierProps = {
  onClick?: React.MouseEventHandler;
};

export type ModalCloseProps = HelpersProps & ModalCloseModifierProps;

export const ModalClose = forwardRefAs<ModalCloseProps>(
  ({ className, onClick, ...rest }, ref) => {
    const { close } = useModal();

    const handleClick = useCallback(
      (event: React.MouseEvent) => {
        if (onClick !== undefined) {
          onClick(event);
        }
        close();
      },
      [close, onClick],
    );

    return (
      <Generic
        aria-label="close"
        className={classNames("modal-close", "is-large", className)}
        onClick={handleClick}
        ref={ref}
        {...rest}
      />
    );
  },
  { as: "button" },
);

ModalClose.displayName = "Modal.Close";
ModalClose.propTypes = {
  onClick: PropTypes.func,
};
