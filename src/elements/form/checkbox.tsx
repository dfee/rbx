import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type CheckboxProps = HelpersProps;

export const Checkbox = forwardRefAs<CheckboxProps>(
  (props, ref) => <Generic ref={ref} type="checkbox" {...props} />,
  { as: "input" },
);

Checkbox.displayName = "Checkbox";
