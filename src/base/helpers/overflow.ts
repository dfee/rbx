import classNames from "classnames";
import * as PropTypes from "prop-types";

import { TransformFunc } from "./types";

/**
 * Overflow
 * https://github.com/jgthms/bulma/blob/master/sass/base/helpers.sass
 */
export type OverflowHelpersProps = Partial<{
  /** Adds overflow hidden */
  clipped: boolean;
}>;

export const overflowHelpersPropTypes = {
  clipped: PropTypes.bool,
};

export const transformOverflowHelpers: TransformFunc<OverflowHelpersProps> = (
  props,
  componentName,
  location = "prop",
) => {
  PropTypes.checkPropTypes(
    overflowHelpersPropTypes,
    props,
    location,
    componentName,
  );
  const { className, clipped, ...rest } = props;

  return {
    className: classNames({ "is-clipped": clipped }, className),
    ...rest,
  };
};
