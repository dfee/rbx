import classNames from "classnames";
import * as PropTypes from "prop-types";

import { TransformFunc } from "./types";

/**
 * Other
 * https://github.com/jgthms/bulma/blob/master/sass/base/helpers.sass
 */
export type OtherHelpersProps = Partial<{
  /** Removes any margin */
  marginless: boolean;
  /** Removes any padding */
  paddingless: boolean;
  /** Removes any radius */
  radiusless: boolean;
  /** Removes any shadow */
  shadowless: boolean;
  /** Prevents the text from being selectable */
  unselectable: boolean;
}>;

export const otherHelpersPropTypes = {
  marginless: PropTypes.bool,
  paddingless: PropTypes.bool,
  radiusless: PropTypes.bool,
  shadowless: PropTypes.bool,
  unselectable: PropTypes.bool,
};

export const transformOtherHelpers: TransformFunc<OtherHelpersProps> = (
  props,
  componentName,
  location = "prop",
) => {
  PropTypes.checkPropTypes(
    otherHelpersPropTypes,
    props,
    location,
    componentName,
  );
  const {
    className,
    marginless,
    paddingless,
    radiusless,
    shadowless,
    unselectable,
    ...rest
  } = props;

  return {
    className: classNames(
      {
        "is-marginless": marginless,
        "is-paddingless": paddingless,
        "is-radiusless": radiusless,
        "is-shadowless": shadowless,
        "is-unselectable": unselectable,
      },
      className,
    ),
    ...rest,
  };
};
