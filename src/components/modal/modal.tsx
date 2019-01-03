import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs } from "src/base";
import { Omit } from "src/types";
import { ModalBackground } from "./modal-background";
import { ModalCard } from "./modal-card";
import { ModalClose } from "./modal-close";
import { ModalContainer, ModalContainerProps } from "./modal-container";
import { ModalContent } from "./modal-content";
import { ModalContext } from "./modal-context";
import { ModalPortal } from "./modal-portal";

export type ModalProps = Omit<ModalContainerProps, "as" | "innerRef">;

const propTypes = {
  active: PropTypes.bool,
  closeOnBlur: PropTypes.bool,
  closeOnEsc: PropTypes.bool,
  containerClassName: PropTypes.string,
  onClose: PropTypes.func,
};

export const Modal = Object.assign(
  forwardRefAs<ModalProps, "div">(
    (props, ref) => <ModalContainer innerRef={ref} {...props} />,
    { as: "div" },
  ),
  {
    Background: ModalBackground,
    Card: ModalCard,
    Close: ModalClose,
    Container: ModalContainer,
    Content: ModalContent,
    Context: ModalContext,
    Portal: ModalPortal,
    propTypes,
  },
);
