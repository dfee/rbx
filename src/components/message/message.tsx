import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { Variables } from "../../base/helpers/variables";
import { Prefer } from "../../types";
import { tuple } from "../../utils";
import { MessageBody } from "./message-body";
import { MessageHeader } from "./message-header";

export const MESSAGE_DEFAULTS = {
  sizes: tuple("small", "medium", "large"),
};

export interface MessageVariablesOverrides {}

export interface MessageVariablesDefaults {
  sizes: (typeof MESSAGE_DEFAULTS["sizes"])[number];
}

export type MessageVariables = Prefer<
  MessageVariablesOverrides,
  MessageVariablesDefaults
>;

export type MessageModifierProps = Partial<{
  color: Variables["colors"];
  size: MessageVariables["sizes"];
}>;

export type MessageProps = HelpersProps & MessageModifierProps;

export const Message = Object.assign(
  forwardRefAs<MessageProps>(
    ({ className, color, size, ...rest }, ref) => (
      <Generic
        className={classNames(
          "message",
          {
            [`is-${color}`]: color,
            [`is-${size}`]: size,
          },
          className,
        )}
        ref={ref}
        {...rest}
      />
    ),
    { as: "article" },
  ),
  {
    Body: MessageBody,
    Header: MessageHeader,
  },
);

Message.displayName = "Message";
Message.propTypes = {
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
