import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/generic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type TabModifierProps = Partial<{
  active: boolean;
}>;

export type TabProps = ModifierProps & TabModifierProps;

export const Tab = forwardRefAs<TabModifierProps, "a">((props, ref) => {
  const { as, active, className, style, ...rest } = transformModifiers(props);
  return (
    <li
      style={style}
      className={cx(className, {
        "is-active": active,
      })}
    >
      {React.createElement(as!, { ref, ...rest })}
    </li>
  );
}, "a");

Tab.defaultProps = Object.assign({ active: false }, Tab.defaultProps);
