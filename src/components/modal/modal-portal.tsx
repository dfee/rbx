import classNames from "classnames";
import React, { useCallback, useEffect } from "react";

import { Generic, forwardRefAs } from "../../base";

import { initialValue, ModalContext, ModalContextValue } from "./modal-context";

export type ModalPortalModifierProps = {
  className?: string;
  clipped?: boolean;
  closeOnBlur?: ModalContextValue["closeOnBlur"];
  closeOnEsc?: ModalContextValue["closeOnEsc"];
  document: Document;
  onClose?: ModalContextValue["close"];
};

export type ModalPortalProps = ModalPortalModifierProps;

export const ModalPortal = forwardRefAs<ModalPortalProps>(
  (
    {
      className,
      clipped,
      closeOnBlur = initialValue.closeOnBlur,
      closeOnEsc = initialValue.closeOnEsc,
      document,
      onClose,
      ...rest
    },
    ref,
  ) => {
    const handleClose = useCallback(() => {
      if (onClose !== undefined) {
        onClose();
      }
    }, [onClose]);

    useEffect(() => {
      const handleKeydown = (event: KeyboardEvent) => {
        if (closeOnEsc === true && event.code === "Escape") {
          handleClose();
        }
      };

      document.addEventListener("keydown", handleKeydown);
      const html = document.querySelector("html");
      /* istanbul ignore if: typeguard */
      if (html === null) {
        return undefined;
      }

      if (clipped === true) {
        html.classList.add("is-clipped");
      }

      return () => {
        document.removeEventListener("keydown", handleKeydown);
        html.classList.remove("is-clipped");
      };
    }, [clipped, closeOnEsc, document, handleClose]);

    return (
      <ModalContext.Provider
        value={{
          close: handleClose,
          closeOnBlur: Boolean(closeOnBlur),
          closeOnEsc: Boolean(closeOnEsc),
        }}
      >
        <Generic
          ref={ref}
          className={classNames("modal", "is-active", className)}
          {...rest}
        />
      </ModalContext.Provider>
    );
  },
  { as: "div" },
);

ModalPortal.displayName = "Modal.Portal";
