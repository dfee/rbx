import classNames from "classnames";
import * as PropTypes from "prop-types";

import { tuple } from "../../utils";
import { TransformFunc } from "./types";

/**
 * Float
 * https://github.com/jgthms/bulma/blob/master/sass/base/helpers.sass
 */
export const FLOAT_PULLED_ALIGNMENTS = tuple("left", "right");
export type FloatPulledAlignments = (typeof FLOAT_PULLED_ALIGNMENTS)[number];

export type FloatHelpersProps = Partial<{
  /** Fixes an element's floating children */
  clearfix: boolean;
  /** Moves an element to the left or right */
  pull: FloatPulledAlignments;
}>;

export const makeFloatHelpersPropTypesDefaults = {
  floatPulledAssignments: FLOAT_PULLED_ALIGNMENTS,
};

export const makeFloatHelpersPropTypes = (
  options: {
    floatPulledAssignments?: string[];
  } = makeFloatHelpersPropTypesDefaults,
) => {
  const values = { ...options, ...makeFloatHelpersPropTypesDefaults };

  return {
    clearfix: PropTypes.bool,
    pull: PropTypes.oneOf(values.floatPulledAssignments),
  };
};

export const floatHelpersPropTypes = makeFloatHelpersPropTypes();

export const transformFloatHelpers: TransformFunc<FloatHelpersProps> = (
  props,
  componentName,
  location = "prop",
) => {
  PropTypes.checkPropTypes(
    floatHelpersPropTypes,
    props,
    location,
    componentName,
  );
  const { className, clearfix, pull, ...rest } = props;

  return {
    className: classNames(
      {
        "is-clearfix": clearfix,
        [`is-pulled-${pull}`]: pull,
      },
      className,
    ),
    ...rest,
  };
};
