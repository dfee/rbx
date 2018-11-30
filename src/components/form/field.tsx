import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, modify } from "@/modifiers";
import { FieldBody } from "./field-body";
import { FieldLabel } from "./field-label";

export type FieldModifierProps = Partial<{
  align: "centered" | "right";
  horizontal: boolean;
  kind: "addons" | "group";
  multiline: boolean;
}>;

export type FieldProps = ModifierProps & FieldModifierProps;

export const Field = Object.assign(
  asExoticComponent<FieldProps, "div">((props, ref) => {
    const { as, align, multiline, horizontal, kind, ...rest } = modify(props);

    let k = null;
    if (kind === "addons") {
      k = "has-addons";
    } else if (kind === "group") {
      k = "is-grouped";
    }

    rest.className = cx("field", rest.className, {
      [`${k}`]: k,
      [`${k}-${align}`]: k && align,
      [`${k}-multiline`]: k === "is-grouped" && multiline,
      "is-horizontal": horizontal,
    });

    return React.createElement(as!, { ref, ...rest });
  }, "div"),
  {
    Body: FieldBody,
    Label: FieldLabel,
  },
);

Field.defaultProps = Object.assign(
  {
    horizontal: false,
    multiline: false,
  },
  Field.defaultProps,
);
