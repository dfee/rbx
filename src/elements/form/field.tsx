import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { tuple } from "@/utils";
import { FieldBody } from "./field-body";
import { FieldLabel } from "./field-label";

export const FIELD_ALIGNMENTS = tuple("centered", "right");
export type FieldAlignments = (typeof FIELD_ALIGNMENTS)[number];

export const FIELD_KINDS = tuple("addons", "group");
export type FieldKinds = (typeof FIELD_KINDS)[number];

export type FieldModifierProps = Partial<{
  align: FieldAlignments;
  expanded: boolean;
  horizontal: boolean;
  kind: FieldKinds;
  multiline: boolean;
  narrow: boolean;
}>;

export type FieldProps = ModifierProps & FieldModifierProps;

export const Field = Object.assign(
  forwardRefAs<FieldProps, "div">((props, ref) => {
    const {
      as,
      align,
      expanded,
      multiline,
      horizontal,
      kind,
      narrow,
      ...rest
    } = transformModifiers(props);

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
      "is-expanded": expanded,
      "is-horizontal": horizontal,
      "is-narrow": narrow,
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
