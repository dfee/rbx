import { faHome } from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  Props as FAProps,
} from "@fortawesome/react-fontawesome";
import { boolean, select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Icon } from "src/elements";
import { ICON_DEFAULTS, IconVariables } from "src/elements/icon/icon";

import { colorKnob } from "docs/stories/common";
import { filterUndefined, iterableToSelectObject } from "docs/stories/utils";
import { Section } from "src/layout";

const faSizeMap: {
  [k in IconVariables["sizes"] | "default"]: FAProps["size"]
} = {
  default: "1x",
  large: "3x",
  medium: "2x",
  small: "1x",
};

export const knobs = {
  align: (title: string = "Align") =>
    select(
      title,
      iterableToSelectObject(ICON_DEFAULTS.alignments, { undefined: "" }),
      "",
    ),
  fontAwesome: {
    border: (title: string = "Border") => boolean(title, false),
    fixedWidth: (title: string = "Fixed width") => boolean(title, false),
    flip: (title: string = "Flip") =>
      select(
        title,
        iterableToSelectObject(["both", "horizontal", "vertical"], {
          undefined: "",
        }),
        "",
      ),
    inverse: (title: string = "Inverse") => boolean(title, false),
    pulse: (title: string = "Pulse") => boolean(title, false),
    rotation: (title: string = "Rotate") =>
      select(
        title,
        iterableToSelectObject([90, 180, 270], { undefined: "" }),
        "",
      ),
    spin: (title: string = "Spin") => boolean(title, false),
  },
  size: (title: string = "Size") =>
    select(
      title,
      iterableToSelectObject(ICON_DEFAULTS.sizes, { undefined: "" }),
      "",
    ),
};

storiesOf("Elements/Icon", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Font Awesome", () => {
    const iconProps = filterUndefined({
      align: knobs.align("Align (when in control)"),
      color: colorKnob(),
      size: knobs.size(),
    });

    const faIconProps = filterUndefined({
      border: knobs.fontAwesome.border(),
      fixedWidth: knobs.fontAwesome.fixedWidth(),
      flip: knobs.fontAwesome.flip(),
      inverse: knobs.fontAwesome.inverse(),
      pulse: knobs.fontAwesome.pulse(),
      rotation: knobs.fontAwesome.rotation(),
      spin: knobs.fontAwesome.spin(),
    });

    const faIconSize =
      faSizeMap[
        iconProps.size === undefined
          ? "default"
          : (iconProps.size as IconVariables["sizes"])
      ];

    return (
      <ul>
        <li>
          <Icon {...iconProps}>
            <FontAwesomeIcon {...faIconProps} icon={faHome} size={faIconSize} />
          </Icon>
        </li>
      </ul>
    );
  });
