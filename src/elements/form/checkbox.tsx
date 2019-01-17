import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type CheckboxProps = HelpersProps;

export const Checkbox = forwardRefAs<CheckboxProps, "input">(
  (props, ref) => <Generic ref={ref} type="checkbox" {...props} />,
  { as: "input" },
);

Checkbox.displayName = "Checkbox";
