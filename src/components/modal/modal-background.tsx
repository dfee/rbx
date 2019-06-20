import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { ModalContextValue, useModal } from "./modal-context";

export type ModalBackgroundModifierProps = {
  onClick?: React.MouseEventHandler;
};

export type ModalBackgroundProps = HelpersProps & ModalBackgroundModifierProps;

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

export const ModalBackground = forwardRefAs<ModalBackgroundProps>(
  ({ className, onClick, ...rest }, ref) => {
    const ctx = useModal();
    return (
      <Generic
        className={classNames("modal-background", className)}
        onClick={onClickHandler(onClick, ctx)}
        ref={ref}
        role="presentation"
        {...rest}
      />
    );
  },
  { as: "div" },
);

ModalBackground.displayName = "Modal.Background";
ModalBackground.propTypes = {
  onClick: PropTypes.func,
};
