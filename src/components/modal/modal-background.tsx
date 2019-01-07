import classNames from "classnames";
import * as PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { ModalContext, ModalContextValue } from "./modal-context";

export type ModalBackgroundModifierProps = Partial<{
  onClick: React.MouseEventHandler;
}>;

export type ModalBackgroundProps = HelpersProps & ModalBackgroundModifierProps;

const propTypes = {
  onClick: PropTypes.func,
};

const onClickHandler = (
  onClick: ModalBackgroundProps["onClick"],
  ctx: ModalContextValue,
) => (event: React.MouseEvent) => {
  if (onClick !== undefined) {
    onClick(event);
  }
  if (ctx.closeOnBlur) {
    ctx.close();
  }
};

export const ModalBackground = Object.assign(
  forwardRefAs<ModalBackgroundProps, "div">(
    ({ className, onClick, ...rest }, ref) => (
      <ModalContext.Consumer>
        {ctx => (
          <Generic
            className={classNames("modal-background", className)}
            onClick={onClickHandler(onClick, ctx)}
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
