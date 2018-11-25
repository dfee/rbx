import { cx } from "emotion";
import * as React from "react";

import renderAsExoticComponent from "components/render-as-exotic-component";
import modifiers, { ModifierProps } from "modifiers";

export type ElementProps = ModifierProps;

const Element = renderAsExoticComponent<ElementProps, "div">(
  ({ className, renderAs, ...allProps }, ref) => {
    const props = {
      className: cx(className, modifiers.classNames(allProps)) || undefined,
      ref,
      ...modifiers.clean(allProps),
    };
    return React.createElement(renderAs!, props);
  },
  "div",
);

export default Element;
