import classNames from "classnames";
import * as PropTypes from "prop-types";

import { TransformFunc } from "./types";

/**
 * Overlay
 * https://github.com/jgthms/bulma/blob/master/sass/base/helpers.sass
 */
export type OverlayHelpersProps = Partial<{
  /** Completely covers the first positioned parent */
  overlay: boolean;
}>;

export const overlayHelpersPropTypes = {
  overlay: PropTypes.bool,
};

export const transformOverlayHelpers: TransformFunc<OverlayHelpersProps> = (
  props,
  componentName,
  location = "prop",
) => {
  PropTypes.checkPropTypes(
    overlayHelpersPropTypes,
    props,
    location,
    componentName,
  );
  const { className, overlay, ...rest } = props;

  return {
    className: classNames({ "is-overlay": overlay }, className),
    ...rest,
  };
};
