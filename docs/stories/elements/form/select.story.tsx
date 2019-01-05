import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { boolean, number, select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Control, Icon, Select } from "src/elements";
import {
  SELECT_CONTAINER_SIZES,
  SELECT_CONTAINER_STATES,
} from "src/elements/form/select";
import { Section } from "src/layout";

import { colorKnob } from "docs/stories/common";
import { filterUndefined, iterableToSelectObject } from "docs/stories/utils";

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
    const controlProps = {
      iconLeft: knobs.control.hasIcon(),
    };

    const containerProps = filterUndefined({
      color: colorKnob("Container color"),
      fullwidth: knobs.container.fullwidth("Container fullwidth"),
      size: knobs.container.size("Container size"),
      state: knobs.container.state("Container state"),
      rounded: knobs.container.rounded("Container rounded"),
    });

    const selectProps = filterUndefined({
      disabled: knobs.disabled(),
      multiple: knobs.multiple(),
      size: knobs.size(),
    });
    if (selectProps.multiple === false) {
      delete selectProps.size;
    }

    const icon = controlProps.iconLeft ? (
      <Icon as="div" size="small" align="left">
        <FontAwesomeIcon icon={faGlobe} />
      </Icon>
    ) : (
      undefined
    );

    return (
      <Control {...controlProps}>
        <Select.Container {...containerProps}>
          <Select {...selectProps}>
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
        {icon}
      </Control>
    );
  });
