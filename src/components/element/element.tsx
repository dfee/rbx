import { cx } from "emotion";
import * as React from "react";

import { renderAsExoticComponent } from "components/render-as-exotic-component";
import { classNames, clean, ModifierProps } from "modifiers";

export type ElementProps = ModifierProps;

export const Element = renderAsExoticComponent<ElementProps, "div">(
  ({ className, renderAs, ...allProps }, ref) => {
    const props = {
      className: cx(className, classNames(allProps)) || undefined,
      ref,
      ...clean(allProps),
    };
    return React.createElement(renderAs!, props);
  },
  "div",
);
