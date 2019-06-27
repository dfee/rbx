import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type ModalCardFootProps = HelpersProps;

export const ModalCardFoot = forwardRefAs<ModalCardFootProps>(
  ({ className, ...rest }, ref) => (
    <Generic
      ref={ref}
      className={classNames("modal-card-foot", className)}
      {...rest}
    />
  ),
  { as: "footer" },
);

ModalCardFoot.displayName = "Modal.Card.Foot";
