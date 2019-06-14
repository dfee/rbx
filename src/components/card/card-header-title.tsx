import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Prefer } from "../../types";

export const CARD_HEADER_TITLE_DEFAULTS = {
  alignments: ["centered"] as const,
};

export interface CardHeaderTitleVariablesOverrides {}

export interface CardHeaderTitleVariablesDefaults {
  alignments: (typeof CARD_HEADER_TITLE_DEFAULTS["alignments"])[number];
}

export type CardHeaderTitleVariables = Prefer<
  CardHeaderTitleVariablesOverrides,
  CardHeaderTitleVariablesDefaults
>;

export type CardHeaderTitleModifierProps = {
  align?: CardHeaderTitleVariables["alignments"];
};

export type CardHeaderTitleProps = HelpersProps & CardHeaderTitleModifierProps;

export const CardHeaderTitle = forwardRefAs<CardHeaderTitleProps>(
  ({ align, className, ...rest }, ref) => (
    <Generic
      className={classNames(
        "card-header-title",
        { [`is-${align}`]: align },
        className,
      )}
      ref={ref}
      {...rest}
    />
  ),
  { as: "div" },
);

CardHeaderTitle.displayName = "Card.Header.Title";
CardHeaderTitle.propTypes = {
  align: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
