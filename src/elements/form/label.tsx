import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Prefer } from "../../types";
import { Checkbox } from "./checkbox";
import { Radio } from "./radio";

export const LABEL_DEFAULTS = {
  sizes: ["small", "medium", "large"] as const,
};

export interface LabelVariablesOverrides {}

export interface LabelVariablesDefaults {
  sizes: (typeof LABEL_DEFAULTS["sizes"])[number];
}

export type LabelVariables = Prefer<
  LabelVariablesOverrides,
  LabelVariablesDefaults
>;

export type LabelModifierProps = Partial<{
  disabled: boolean;
  size: LabelVariables["sizes"];
}>;

export type LabelProps = HelpersProps & LabelModifierProps;

const identifyLabelDiscriminator = (children: React.ReactNode) => {
  let discriminator = "label";

  React.Children.forEach(children, (child, i) => {
    if (typeof child === "object" && child !== null && "type" in child) {
      if (
        child.type === Checkbox ||
        (child.type === "input" &&
          (child.props as React.InputHTMLAttributes<Element>).type ===
            "checkbox")
      ) {
        discriminator = "checkbox";
      } else if (
        child.type === Radio ||
        (child.type === "input" &&
          (child.props as React.InputHTMLAttributes<Element>).type === "radio")
      ) {
        discriminator = "radio";
      } else if (child.type === React.Fragment) {
        discriminator = identifyLabelDiscriminator(
          (child.props as React.ComponentPropsWithoutRef<typeof React.Fragment>)
            .children,
        );
      }
    }
  });

  return discriminator;
};

export const Label = forwardRefAs<LabelProps>(
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
);

Label.displayName = "Label";
Label.propTypes = {
  disabled: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
