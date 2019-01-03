import classNames from "classNames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";
import { tuple } from "src/utils";
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

export type FieldProps = HelpersProps & FieldModifierProps;

const propTypes = {
  align: PropTypes.oneOf(FIELD_ALIGNMENTS),
  expanded: PropTypes.bool,
  horizontal: PropTypes.bool,
  kind: PropTypes.oneOf(FIELD_KINDS),
  multiline: PropTypes.bool,
  narrow: PropTypes.bool,
};

export const Field = Object.assign(
  forwardRefAs<FieldProps, "div">(
    (props, ref) => {
      const {
        align,
        expanded,
        horizontal,
        kind,
        multiline,
        narrow,
        ...rest
      } = props;

      let k: string | undefined;
      if (kind === "addons") {
        k = "has-addons";
      } else if (kind === "group") {
        k = "is-grouped";
      }

      rest.className = classNames(
        "field",
        {
          [`${k}`]: k,
          [`${k}-${align}`]: k !== undefined && align !== undefined,
          [`${k}-multiline`]: k === "is-grouped" && multiline === true,
          "is-expanded": expanded,
          "is-horizontal": horizontal,
          "is-narrow": narrow,
        },
        rest.className,
      );

      return <Generic ref={ref} {...rest} />;
    },
    { as: "div" },
  ),
  {
    Body: FieldBody,
    Label: FieldLabel,
    propTypes,
  },
);
