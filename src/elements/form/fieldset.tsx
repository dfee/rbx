import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type FieldsetModifierProps = {
  disabled?: boolean;
};

export type FieldsetProps = HelpersProps & FieldsetModifierProps;

export const Fieldset = forwardRefAs<FieldsetProps>(
  ({ disabled, ...rest }, ref) => (
    <Generic ref={ref} disabled={disabled} {...rest} />
  ),
  { as: "fieldset" },
);

Fieldset.displayName = "Fieldset";
Fieldset.propTypes = {
  disabled: PropTypes.bool,
};
