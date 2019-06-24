import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Prefer } from "../../types";

export const CARD_HEADER_TITLE_DEFAULTS = {
  alignments: ["centered"] as const,
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
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

export const CardHeaderTitle = Object.assign(
  forwardRefAs<CardHeaderTitleProps>(
    ({ align, className, ...rest }, ref) => (
      <Generic
        ref={ref}
        className={classNames(
          "card-header-title",
          { [`is-${align}`]: align },
          className,
        )}
        {...rest}
      />
    ),
    { as: "div" },
  ),
  {
    VARIABLE_DEFAULTS: CARD_HEADER_TITLE_DEFAULTS,
  },
);

CardHeaderTitle.displayName = "Card.Header.Title";
CardHeaderTitle.propTypes = {
  align: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
