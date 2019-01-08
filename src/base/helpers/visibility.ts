import classNames from "classnames";
import * as PropTypes from "prop-types";

import { tuple } from "../../utils";
import { TransformFunc } from "./types";

/**
 * Visibility
 * https://github.com/jgthms/bulma/blob/master/sass/base/helpers.sass
 */
export const DISPLAYS = tuple(
  "block",
  "flex",
  "inline",
  "inline-block",
  "inline-flex",
);
export type Displays = (typeof DISPLAYS)[number];

export type VisibilityHelpersProps = Partial<{
  /** Hides an element (unclear on where this is documented in Bulma) */
  hidden: boolean;
  /** Adds visibility hidden */
  invisible: boolean;
  /**
   * Hide elements visually but keep the element available to be announced by a
   * screen reader
   */
  srOnly: boolean;
}>;

export const visibilityHelpersPropTypes = {
  hidden: PropTypes.bool,
  invisible: PropTypes.bool,
  srOnly: PropTypes.bool,
};

export const transformVisibilityHelpers: TransformFunc<
  VisibilityHelpersProps
> = (props, componentName, location = "prop") => {
  PropTypes.checkPropTypes(
    visibilityHelpersPropTypes,
    props,
    location,
    componentName,
  );
  const { className, hidden, invisible, srOnly, ...rest } = props;

  return {
    className: classNames(
      {
        "is-hidden": hidden,
        "is-invisible": invisible,
        "is-sr-only": srOnly,
      },
      className,
    ),
    ...rest,
  };
};
