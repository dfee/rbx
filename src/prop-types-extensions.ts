import PropTypes from "prop-types";

export const renderablePropType = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.string,
  PropTypes.shape({ render: PropTypes.func.isRequired }),
]);

export const refPropType = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.object,
]);
