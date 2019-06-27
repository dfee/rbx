import * as React from "react";

import { renderablePropType } from "../prop-types-extensions";
import { canReceiveRef } from "../utils";

import { forwardRefAs } from "./exotic";
import { HelpersProps } from "./helpers";
import { DEFAULTS } from "./helpers/variables";
import { useTheme } from "./theme";

export type GenericProps = HelpersProps;

export const Generic = Object.assign(
  forwardRefAs<GenericProps>(
    ({ as, ...rest }, ref) => {
      const { transform } = useTheme();
      return React.createElement(as, {
        ...transform(rest, "Generic"),
        ...(canReceiveRef(as) ? { ref } : {}),
      });
    },
    { as: "div" },
  ),
  {
    DEFAULTS,
  },
);

Generic.displayName = "Generic";
Generic.propTypes = {
  as: renderablePropType,
};
