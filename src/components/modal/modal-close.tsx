import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";
import { ModalContext } from "./modal-context";

export type ModalCloseModifierProps = Partial<{
  onClick: React.MouseEventHandler<any>;
}>;

export type ModalCloseProps = HelpersProps & ModalCloseModifierProps;

const propTypes = {
  ...genericPropTypes,
  onClick: PropTypes.func,
};

export const ModalClose = Object.assign(
  forwardRefAs<ModalCloseProps, "button">(
    (props, ref) => {
      const { as, onClick, ...rest } = transformHelpers(props);
      rest.className = classNames("modal-close", "is-large", rest.className);
      return (
        <ModalContext.Consumer>
          {({ onClose }) =>
            React.createElement(as!, {
              ["aria-label"]: "close",
              onClick: (event: React.MouseEvent<any>) => {
                if (onClick) {
                  onClick(event);
                }
                onClose();
              },
              ref,
              ...rest,
            })
          }
        </ModalContext.Consumer>
      );
    },
    { as: "button" },
  ),
  { propTypes },
);
