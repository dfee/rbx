import { cx } from "emotion";
import React from "react";

import { ModifierProps, transformModifiers } from "@/modifiers";
import { ModalContext } from "./modal-context";

export type ModalBackgroundProps = Prefer<
  ModifierProps,
  React.HTMLAttributes<HTMLDivElement>
>;

export const ModalBackground = React.forwardRef<
  HTMLDivElement,
  ModalBackgroundProps
>((props, ref) => {
  const { className, ...rest } = transformModifiers(props);
  return (
    <ModalContext.Consumer>
      {({ closeOnBlur, onClose }) => (
        <div
          ref={ref}
          role="presentation"
          className={cx("modal-background", className)}
          onClick={closeOnBlur ? () => onClose() : undefined}
          {...rest}
        />
      )}
    </ModalContext.Consumer>
  );
});
