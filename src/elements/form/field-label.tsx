import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";
import { tuple } from "../../utils";

export const FILED_LABEL_SIZES = tuple("small", "normal", "medium", "large");
export type FieldLabelSizes = (typeof FILED_LABEL_SIZES)[number];

export type FieldLabelModifierProps = Partial<{
  size: FieldLabelSizes;
}>;

export type FieldLabelProps = HelpersProps & FieldLabelModifierProps;

const propTypes = {
  ...genericPropTypes,
  size: PropTypes.oneOf(FILED_LABEL_SIZES),
};

export const FieldLabel = Object.assign(
  forwardRefAs<FieldLabelProps, "div">(
    (props, ref) => {
      const { as, size, ...rest } = transformHelpers(props);
      rest.className = classNames("field-label", rest.className, {
        [`is-${size}`]: size,
      });
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "div" },
  ),
  {
    propTypes,
  },
);
