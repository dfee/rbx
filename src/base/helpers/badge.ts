import classNames from "classnames";
import * as PropTypes from "prop-types";

import {
  TransformFunction,
  makePropTypesFactory,
  makeValidatingTransformFactory,
} from "./factory";
import { DEFAULTS, Variables } from "./variables";

export type BadgeHelpersProps = {
  badge?: number | string;
  badgeColor?: Variables["colors"];
  badgeOutlined?: boolean;
  badgeRounded?: boolean;
  badgeSize?: (typeof DEFAULTS["badgeSizes"])[number];
};

// Factories
export const makePropTypes = makePropTypesFactory(vars => ({
  badge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  badgeColor: PropTypes.oneOf(vars.colors),
  badgeOutlined: PropTypes.bool,
  badgeRounded: PropTypes.bool,
  badgeSize: PropTypes.oneOf(vars.badgeSizes),
}));

export const transform: TransformFunction<
  BadgeHelpersProps,
  { "data-badge"?: string | number }
> = props => {
  const {
    badge,
    badgeColor,
    badgeOutlined,
    badgeRounded,
    badgeSize,
    className,
    ...rest
  } = props;

  return {
    className: classNames(
      {
        badge,
        [`has-badge-${badgeColor}`]: badgeColor,
        "has-badge-outlined": badgeOutlined,
        "has-badge-rounded": badgeRounded,
        [`has-badge-${badgeSize}`]: badgeSize,
      },
      className,
    ),
    ...(badge !== undefined ? { "data-badge": badge } : {}),
    ...rest,
  };
};

export const makeValidatingTransform = makeValidatingTransformFactory(
  makePropTypes,
  transform,
);
