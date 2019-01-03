import * as PropTypes from "prop-types";

// tslint:disable-next-line:export-name
export const renderablePropType = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.string,
  PropTypes.shape({ render: PropTypes.func.isRequired }),
]);
