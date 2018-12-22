import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { boolean, number, select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Control, Icon, Select } from "../../../../src/elements";
import {
  SELECT_CONTAINER_SIZES,
  SELECT_CONTAINER_STATES,
} from "../../../../src/elements/form/select";
import { Section } from "../../../../src/layout";

import { colorKnob } from "../../common";
import { iterableToSelectObject } from "../../utils";

export const knobs = {
  container: {
    fullwidth: (title: string = "Fullwidth") => boolean(title, false),
    rounded: (title: string = "Rounded") => boolean(title, false),
    size: (title: string = "Size") =>
      select(
        title,
        iterableToSelectObject(SELECT_CONTAINER_SIZES, { undefined: "" }),
        "",
      ),
    state: (title: string = "State") =>
      select(
        title,
        iterableToSelectObject(SELECT_CONTAINER_STATES, { undefined: "" }),
        "",
      ),
  },
  control: {
    hasIcon: (title: string = "Has icon") => boolean(title, false),
  },
  disabled: (title: string = "Disabled") => boolean(title, false),
  multiple: (title: string = "Multiple") => boolean(title, false),
  size: (title: string = "Size (multiple)") =>
    number(title, 3, {
      max: 10,
      min: 3,
      range: true,
      step: 1,
    }),
};

storiesOf("Elements/Form/Select", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Default", () => {
    const containerColor = colorKnob("Container color");
    const containerFullwidth = knobs.container.fullwidth("Container fullwidth");
    const containerSize = knobs.container.size("Container size");
    const containerState = knobs.container.state("Container state");
    const containerRounded = knobs.container.rounded("Container rounded");
    const controlHasIcon = knobs.control.hasIcon();

    const selectDisabled = knobs.disabled();
    const selectMultiple = knobs.multiple();
    const selectSize = knobs.size();

    return (
      <Control iconLeft={controlHasIcon}>
        <Select.Container
          color={containerColor || undefined}
          fullwidth={containerFullwidth}
          rounded={containerRounded}
          size={containerSize || undefined}
          state={containerState || undefined}
        >
          <Select
            disabled={selectDisabled}
            multiple={selectMultiple}
            size={(selectMultiple && selectSize) || undefined}
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
        </Select.Container>
        {controlHasIcon && (
          <Icon as="div" size="small" align="left">
            <FontAwesomeIcon icon={faGlobe} />
          </Icon>
        )}
      </Control>
    );
  });
