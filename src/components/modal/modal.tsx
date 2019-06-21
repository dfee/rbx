import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { forwardRefAs } from "../../base";

import { ModalBackground } from "./modal-background";
import { ModalCard } from "./modal-card";
import { ModalClose } from "./modal-close";
import { ModalContent } from "./modal-content";
import { ModalContext, ModalContextValue } from "./modal-context";
import { ModalPortal } from "./modal-portal";

export type ModalProps = {
  active?: boolean;
  children?: React.ReactNode;
  clipped?: boolean;
  closeOnBlur?: ModalContextValue["closeOnBlur"];
  closeOnEsc?: ModalContextValue["closeOnEsc"];
  containerClassName?: string;
  document?: Document;
  onClose?: () => void;
};

export const Modal = Object.assign(
  forwardRefAs<ModalProps>(
    ({ active, containerClassName, document: _document, ...rest }, ref) => {
      const [el, setEl] = useState<HTMLDivElement | undefined>(undefined);
      const [doc, setDoc] = useState<Document | undefined>(undefined);

      useEffect(() => {
        const _doc = _document !== undefined ? _document : document;
        const _el = _doc.createElement("div");
        setDoc(_doc);
        setEl(_el);

        if (containerClassName !== undefined) {
          _el.className = containerClassName;
        }
        _doc.body.appendChild(_el);

        return () => {
          _doc.body.removeChild(_el);
        };
      }, [_document, containerClassName]);

      if (doc === undefined || el === undefined || active !== true) {
        return null;
      }

      return ReactDOM.createPortal(
        <ModalPortal ref={ref} document={doc} {...rest} />,
        el,
      );
    },
    {
      as: "div",
      clipped: true,
    },
  ),
  {
    Background: ModalBackground,
    Card: ModalCard,
    Close: ModalClose,
    Content: ModalContent,
    Context: ModalContext,
    Portal: ModalPortal,
  },
);

Modal.displayName = "Modal";
Modal.propTypes = {
  active: PropTypes.bool,
  clipped: PropTypes.bool,
  closeOnBlur: PropTypes.bool,
  closeOnEsc: PropTypes.bool,
  containerClassName: PropTypes.string,
  document: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onClose: PropTypes.func,
};
