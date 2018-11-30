import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type TabsTabModifierProps = Partial<{
  active: boolean;
  className: string;
  style: React.CSSProperties;
}>;

export type TabsTabProps = ModifierProps & TabsTabModifierProps;

// TODO: ref passed to `li` but `as` passed to createElement (default as `a`)
export const Tab = asExoticComponent<TabsTabModifierProps, "a">(
  (props, ref) => {
    const { as, active, className, style, ...rest } = transformModifiers(props);
    return (
      <li
        ref={ref}
        style={style}
        className={cx(className, {
          "is-active": active,
        })}
      >
        {React.createElement(as!, { ...rest })}
      </li>
    );
  },
  "a",
);

Tab.defaultProps = Object.assign({ active: false }, Tab.defaultProps);
