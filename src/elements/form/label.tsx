import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { tuple } from "../../utils";
import { Checkbox } from "./checkbox";
import { Radio } from "./radio";

export const LABEL_SIZES = tuple("small", "medium", "large");
export type LabelSizes = (typeof LABEL_SIZES)[number];

export type LabelModifierProps = Partial<{
  disabled: boolean;
  size: LabelSizes;
}>;

export type LabelProps = HelpersProps & LabelModifierProps;

const propTypes = {
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(LABEL_SIZES),
};

const identifyLabelDiscriminator = (children: React.ReactNode) => {
  let discriminator = "label";

  React.Children.forEach(children, (child, i) => {
    if (typeof child === "object") {
      if (
        child.type === Checkbox ||
        (child.type === "input" && child.props.type === "checkbox")
      ) {
        discriminator = "checkbox";
      } else if (
        child.type === Radio ||
        (child.type === "input" && child.props.type === "radio")
      ) {
        discriminator = "radio";
      } else if (child.type === React.Fragment) {
        discriminator = identifyLabelDiscriminator(child.props.children);
      }
    }
  });

  return discriminator;
};

export const Label = Object.assign(
  forwardRefAs<LabelProps, "label">(
    ({ className, disabled, size, ...rest }, ref) => {
      const discriminator = identifyLabelDiscriminator(rest.children);
      return (
        <Generic
          className={classNames(
            {
              [`${discriminator}`]: discriminator,
              "is-disabled": disabled,
              [`is-${size}`]: size,
            },
            className,
          )}
          ref={ref}
          {...rest}
        />
      );
    },
    { as: "label" },
  ),
  { propTypes },
);
