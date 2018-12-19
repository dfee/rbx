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

export const TITLE_SIZES = tuple(1, 2, 3, 4, 5, 6);
export type TitleSizes = (typeof TITLE_SIZES)[number];

export type TitleModifierProps = Partial<{
  size: TitleSizes;
  spaced: boolean;
  subtitle: boolean;
}>;

export type TitleProps = HelpersProps & TitleModifierProps;

const propTypes = {
  ...genericPropTypes,
  size: PropTypes.oneOf(TITLE_SIZES),
  spaced: PropTypes.bool,
  subtitle: PropTypes.bool,
};

export const Title = Object.assign(
  forwardRefAs<TitleProps, "h1">(
    (props, ref) => {
      const { as, size, spaced, subtitle, ...rest } = transformHelpers(props);
      rest.className = classNames(rest.className, {
        [`is-${size}`]: !!size,
        "is-spaced": spaced && !subtitle,
        subtitle,
        title: !subtitle,
      });
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "h1" },
  ),
  { propTypes },
);
