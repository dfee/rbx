import { cx } from "emotion";
import React from "react";

import Element from "components/element";
import renderAsExoticComponent, {
  RenderAsExoticComponent,
} from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";
import CardHeaderIcon from "./CardHeaderIcon";
import CardHeaderTitle from "./CardHeaderTitle";

export type CardHeaderProps = ModifierProps;

type CardHeader = RenderAsExoticComponent<CardHeaderProps, "div"> & {
  Icon: typeof CardHeaderIcon;
  Title: typeof CardHeaderTitle;
};

const CardHeader: Partial<CardHeader> = renderAsExoticComponent<
  CardHeaderProps,
  "div"
>(
  ({ className, ...props }, ref) => (
    <Element {...props} ref={ref} className={cx("card-header", className)} />
  ),
  "div",
);

CardHeader.Title = CardHeaderTitle;
CardHeader.Icon = CardHeaderIcon;

export default CardHeader as CardHeader;
