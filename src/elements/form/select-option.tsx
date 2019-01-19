import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type SelectOptionProps = HelpersProps;

export const SelectOption = forwardRefAs<HTMLOptionElement, SelectOptionProps>(
  (props, ref) => <Generic ref={ref} {...props} />,
  { as: "option" },
);

SelectOption.displayName = "Select.Option";
