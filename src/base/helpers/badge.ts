import classNames from "classnames";
import PropTypes from "prop-types";

import {
  makePropTypesFactory,
  makeValidatingTransformFactory,
  TransformFunction,
} from "./factory";
import { DEFAULTS, Variables } from "./variables";

export type BadgeHelpersProps = Partial<{
  badge: number | string;
  badgeColor: Variables["colors"];
  badgeOutlined: boolean;
  badgeRounded: boolean;
  badgeSize: (typeof DEFAULTS["badgeSizes"])[number];
}>;

// Factories
export const makePropTypes = makePropTypesFactory(vars => ({
  badge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  badgeColor: PropTypes.oneOf(vars.colors),
  badgeOutlined: PropTypes.bool,
  badgeRounded: PropTypes.bool,
  badgeSize: PropTypes.oneOf(vars.badgeSizes),
}));

export const transform: TransformFunction<BadgeHelpersProps> = props => {
  const {
    badge,
    badgeColor,
    badgeOutlined,
    badgeRounded,
    badgeSize,
    ...rest
  } = props;

  rest.className = classNames(
    {
      badge,
      [`has-badge-${badgeColor}`]: badgeColor,
      "has-badge-outlined": badgeOutlined,
      "has-badge-rounded": badgeRounded,
      [`has-badge-${badgeSize}`]: badgeSize,
    },
    rest.className,
  );

  if (badge !== undefined) {
    rest["data-badge"] = badge;
  }

  return rest;
};

export const makeValidatingTransform = makeValidatingTransformFactory(
  makePropTypes,
  transform,
);
