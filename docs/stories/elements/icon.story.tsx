import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Props as FAProps } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { boolean, select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Icon } from "../../../src/elements";
import {
  ICON_ALIGNMENTS,
  ICON_SIZES,
  IconSizes,
} from "../../../src/elements/icon/icon";

import { Section } from "../../../src/layout";
import { colorKnob } from "../common";
import { iterableToSelectObject } from "../utils";

const faSizeMap: { [k in IconSizes | "default"]: FAProps["size"] } = {
  default: "1x",
  large: "3x",
  medium: "2x",
  small: "1x",
};

export const knobs = {
  align: (title: string = "Align") =>
    select(
      title,
      iterableToSelectObject(ICON_ALIGNMENTS, { undefined: "" }),
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
    listItem: (title: string = "List item") => boolean(title, false),
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
    select(title, iterableToSelectObject(ICON_SIZES, { undefined: "" }), ""),
};

storiesOf("Elements/Icon", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Font Awesome", () => {
    const { align, color, flip, rotation, size, ...rest } = {
      align: knobs.align("Align (when in control)"),
      border: knobs.fontAwesome.border(),
      color: colorKnob(),
      fixedWidth: knobs.fontAwesome.fixedWidth(),
      flip: knobs.fontAwesome.flip(),
      inverse: knobs.fontAwesome.inverse(),
      listItem: knobs.fontAwesome.listItem(),
      pulse: knobs.fontAwesome.pulse(),
      rotation: knobs.fontAwesome.rotation(),
      size: knobs.size(),
      spin: knobs.fontAwesome.spin(),
    };
    return (
      <Icon
        align={align || undefined}
        color={color || undefined}
        size={size || undefined}
      >
        <FontAwesomeIcon
          {...rest}
          flip={flip || undefined}
          icon={faHome}
          rotation={rotation || undefined}
          size={faSizeMap[size || "default"]}
        />
      </Icon>
    );
  });
