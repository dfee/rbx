import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { boolean, number, select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Control, Icon, Select } from "@/elements";
import { SELECT_SIZES, SELECT_STATES } from "@/elements/form/select";
import { Section } from "@/layout";

import { iterableToSelectObject } from "../../helpers";
import { knobs as modifiersKnobs } from "../../modifiers";

export const knobs = {
  disabled: (title: string = "Disabled") => boolean(title, false),
  hasIcon: (title: string = "Has icon") => boolean(title, false),
  multiple: (title: string = "Multiple") => boolean(title, false),
  multipleSize: (title: string = "Multiple size") =>
    number(title, 3, {
      max: 10,
      min: 3,
      range: true,
      step: 1,
    }),
  rounded: (title: string = "Rounded") => boolean(title, false),
  size: (title: string = "Size") =>
    select(title, iterableToSelectObject(SELECT_SIZES, { undefined: "" }), ""),
  state: (title: string = "State") =>
    select(title, iterableToSelectObject(SELECT_STATES, { undefined: "" }), ""),
};

storiesOf("Elements/Form/Select", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Default", () => {
    const hasIcon = knobs.hasIcon();
    const { color, multipleSize, size, state, ...rest } = {
      color: modifiersKnobs.color(),
      disabled: knobs.disabled(),
      multiple: knobs.multiple(),
      multipleSize: knobs.multipleSize(),
      rounded: knobs.rounded(),
      size: knobs.size(),
      state: knobs.state(),
    };
    return (
      <Control iconLeft={hasIcon}>
        <Select
          color={color || undefined}
          multipleSize={rest.multiple ? multipleSize : undefined}
          size={size || undefined}
          state={state || undefined}
          {...rest}
        >
          <Select.Option value="Argentina">Argentina</Select.Option>
          <Select.Option value="Bolivia">Bolivia</Select.Option>
          <Select.Option value="Brazil">Brazil</Select.Option>
          <Select.Option value="Chile">Chile</Select.Option>
          <Select.Option value="Colombia">Colombia</Select.Option>
          <Select.Option value="Ecuador">Ecuador</Select.Option>
          <Select.Option value="Guyana">Guyana</Select.Option>
          <Select.Option value="Paraguay">Paraguay</Select.Option>
          <Select.Option value="Peru">Peru</Select.Option>
          <Select.Option value="Suriname">Suriname</Select.Option>
          <Select.Option value="Uruguay">Uruguay</Select.Option>
          <Select.Option value="Venezuela">Venezuela</Select.Option>
        </Select>
        {hasIcon && (
          <Icon<"div"> as="div" size="small" align="left">
            <FontAwesomeIcon icon={faGlobe} />
          </Icon>
        )}
      </Control>
    );
  });
