import { cx } from "emotion";
import React from "react";

import Element from "components/element";
import renderAsExoticComponent, {
  RenderAsExoticComponent,
} from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";
import MediaContent from "./MediaContent";
import MediaItem from "./MediaItem";

export type MediaModifierProps = Partial<{
  children: React.ReactNode;
  style: React.CSSProperties;
}>;

export type MediaProps = ModifierProps & MediaModifierProps;

type Media = RenderAsExoticComponent<MediaProps, "article"> & {
  Content: typeof MediaContent;
  Item: typeof MediaItem;
};

const Media: Partial<Media> = renderAsExoticComponent(
  ({ children, className, ...props }, ref) => (
    <Element {...props} ref={ref} className={cx("media", className, {})}>
      {children}
    </Element>
  ),
  "article",
);
Media.defaultProps = Object.assign(
  {
    children: null,
  },
  Media.defaultProps,
);

Media.Content = MediaContent;
Media.Item = MediaItem;

export default Media as Media;
