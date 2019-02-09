import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type FieldsetModifierProps = Partial<{
  disabled: boolean;
}>;

export type FieldsetProps = HelpersProps & FieldsetModifierProps;

export const Fieldset = forwardRefAs<FieldsetProps>(
  ({ disabled, ...rest }, ref) => (
    <Generic disabled={disabled} ref={ref} {...rest} />
  ),
  { as: "fieldset" },
);

Fieldset.displayName = "Fieldset";
Fieldset.propTypes = {
  disabled: PropTypes.bool,
};
