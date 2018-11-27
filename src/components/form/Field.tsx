import { cx } from "emotion";
import React from "react";

import { Element } from "components/element";
import { renderAsExoticComponent } from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";
import { FieldBody } from "./field-body";
import { FieldLabel } from "./field-label";

export type FieldModifierProps = Partial<{
  align: "centered" | "right";
  children: React.ReactNode;
  horizontal: boolean;
  kind: "addons" | "group";
  multiline: boolean;
  style: React.CSSProperties;
}>;

export type FieldProps = ModifierProps & FieldModifierProps;

export const Field = Object.assign(
  renderAsExoticComponent<FieldProps, "div">(
    ({ className, align, multiline, horizontal, kind, ...props }, ref) => {
      let k = null;

      if (kind === "addons") {
        k = "has-addons";
      } else if (kind === "group") {
        k = "is-grouped";
      }

      return (
        <Element
          {...props}
          ref={ref}
          className={cx("field", className, {
            [`${k}`]: k,
            [`${k}-${align}`]: k && align,
            [`${k}-multiline`]: k === "is-grouped" && multiline,
            "is-horizontal": horizontal,
          })}
        />
      );
    },
    "div",
  ),
  {
    Body: FieldBody,
    Label: FieldLabel,
  },
);
Field.defaultProps = Object.assign(
  {
    children: null,
    horizontal: false,
    multiline: false,
  },
  Field.defaultProps,
);
