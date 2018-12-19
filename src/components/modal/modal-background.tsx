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

export type ModalBackgroundModifierProps = Partial<{
  onClick: React.MouseEventHandler<any>;
}>;

export type ModalBackgroundProps = HelpersProps & ModalBackgroundModifierProps;

const propTypes = {
  ...genericPropTypes,
  onClick: PropTypes.func,
};

export const ModalBackground = Object.assign(
  forwardRefAs<ModalBackgroundProps, "div">(
    (props, ref) => {
      const { as, onClick, ...rest } = transformHelpers(props);
      rest.className = classNames("modal-background", rest.className);
      return (
        <ModalContext.Consumer>
          {({ closeOnBlur, onClose }) =>
            React.createElement(as!, {
              onClick: (event: React.MouseEvent) => {
                if (onClick) {
                  onClick(event);
                }
                if (closeOnBlur) {
                  onClose();
                }
              },
              ref,
              role: "presentation",
              ...rest,
            })
          }
        </ModalContext.Consumer>
      );
    },
    { as: "div" },
  ),
  { propTypes },
);
