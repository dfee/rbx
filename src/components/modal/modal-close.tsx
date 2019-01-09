import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { ModalContext, ModalContextValue } from "./modal-context";

export type ModalCloseModifierProps = Partial<{
  onClick: React.MouseEventHandler;
}>;

export type ModalCloseProps = HelpersProps & ModalCloseModifierProps;

const propTypes = {
  onClick: PropTypes.func,
};

const onClickHandler = (
  onClick: ModalCloseProps["onClick"] | undefined,
  ctx: ModalContextValue,
) => (event: React.MouseEvent) => {
  if (onClick !== undefined) {
    onClick(event);
  }
  ctx.close();
};

export const ModalClose = Object.assign(
  forwardRefAs<ModalCloseProps, "button">(
    ({ className, onClick, ...rest }, ref) => (
      <ModalContext.Consumer>
        {ctx => (
          <Generic
            aria-label="close"
            className={classNames("modal-close", "is-large", className)}
            onClick={onClickHandler(onClick, ctx)}
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
