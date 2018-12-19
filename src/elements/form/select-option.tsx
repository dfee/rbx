import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";

export type SelectOptionProps = HelpersProps;

export const SelectOption = Object.assign(
  forwardRefAs<SelectOptionProps, "option">(
    (props, ref) => {
      const { as, ...rest } = transformHelpers(props);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "option" },
  ),
  { propTypes: genericPropTypes },
);
