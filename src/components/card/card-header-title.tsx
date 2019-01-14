import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { Prefer } from "../../types";
import { tuple } from "../../utils";

export const CARD_HEADER_TITLE_DEFAULTS = {
  alignments: tuple("centered"),
};

export interface CardHeaderTitleVariablesOverrides {}

export interface CardHeaderTitleVariablesDefaults {
  alignments: (typeof CARD_HEADER_TITLE_DEFAULTS["alignments"])[number];
}

export type CardHeaderTitleVariables = Prefer<
  CardHeaderTitleVariablesOverrides,
  CardHeaderTitleVariablesDefaults
>;

export type CardHeaderTitleModifierProps = Partial<{
  align: CardHeaderTitleVariables["alignments"];
}>;

export type CardHeaderTitleProps = HelpersProps & CardHeaderTitleModifierProps;

const propTypes = {
  align: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export const CardHeaderTitle = Object.assign(
  forwardRefAs<CardHeaderTitleProps, "div">(
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
  ),
  { propTypes },
);
