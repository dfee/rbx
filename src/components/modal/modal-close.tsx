import { cx } from "emotion";
import React from "react";

import { ModifierProps, transformModifiers } from "@/modifiers";
import { ModalContext } from "./modal-context";

export type ModalCloseProps = Prefer<
  ModifierProps,
  React.HTMLAttributes<HTMLButtonElement>
>;

export const ModalClose = React.forwardRef<HTMLButtonElement, ModalCloseProps>(
  (props, ref) => {
    const { className, ...rest } = transformModifiers(props);
    return (
      <ModalContext.Consumer>
        {({ onClose }) => (
          <button
            aria-label="close"
            className={cx("modal-close", "is-large", className)}
            onClick={() => onClose()}
            ref={ref}
            {...rest}
          />
        )}
      </ModalContext.Consumer>
    );
  },
);
