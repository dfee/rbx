import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Variables } from "../../base/helpers/variables";
import { Prefer } from "../../types";

import { MessageBody } from "./message-body";
import { MessageHeader } from "./message-header";

export const MESSAGE_DEFAULTS = {
  sizes: ["small", "medium", "large"] as const,
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MessageVariablesOverrides {}

export interface MessageVariablesDefaults {
  sizes: (typeof MESSAGE_DEFAULTS["sizes"])[number];
}

export type MessageVariables = Prefer<
  MessageVariablesOverrides,
  MessageVariablesDefaults
>;

export type MessageModifierProps = {
  color?: Variables["colors"];
  size?: MessageVariables["sizes"];
};

export type MessageProps = HelpersProps & MessageModifierProps;

export const Message = Object.assign(
  forwardRefAs<MessageProps>(
    ({ className, color, size, ...rest }, ref) => (
      <Generic
        ref={ref}
        className={classNames(
          "message",
          {
            [`is-${color}`]: color,
            [`is-${size}`]: size,
          },
          className,
        )}
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
