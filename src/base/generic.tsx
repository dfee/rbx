import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs } from "./exotic";
import { HelpersProps, helpersPropTypes, transformHelpers } from "./helpers";

export type GenericProps = HelpersProps;

export const propTypes = {
  /** The component this should render as */
  as: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.shape({ render: PropTypes.func.isRequired }),
  ]),
  ...helpersPropTypes,
};

export const Generic = Object.assign(
  forwardRefAs<GenericProps, "div">(
    (props, ref) => {
      const { as, ...rest } = transformHelpers(props);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "div" },
  ),
  { propTypes },
);
