import { cx } from "emotion";
import React from "react";

import Element from "components/element";
import renderAsExoticComponent from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";

export type CardContentProps = ModifierProps;

const CardContent = renderAsExoticComponent<CardContentProps, "div">(
  ({ className, ...props }, ref) => (
    <Element {...props} ref={ref} className={cx("card-content", className)} />
  ),
  "div",
);

export default CardContent;
