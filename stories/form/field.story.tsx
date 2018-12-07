import {
  faCheck,
  faEnvelope,
  faGlobe,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { boolean, select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Columns } from "@/columns";
import { Button, Icon } from "@/elements";
import { Control, Field, Help, Input, Label, Select } from "@/form";
import { CONTROL_SIZES } from "@/form/control";
import { FIELD_ALIGNMENTS } from "@/form/field";
import { INPUT_SIZES } from "@/form/input";
import { LABEL_SIZES } from "@/form/label";
import { Section } from "@/layout";

import { iterableToSelectObject } from "../helpers";
import { knobs as modifiersKnobs } from "../modifiers";

export const knobs = {
  align: (title: string = "Alignment") =>
    select(
      title,
      iterableToSelectObject(FIELD_ALIGNMENTS, { undefined: "" }),
      "",
    ),
  control: {
    expanded: (title: string = "Expanded") => boolean(title, false),
    loading: (title: string = "Loading") => boolean(title, false),
    size: (title: string = "Size") =>
      select(
        title,
        iterableToSelectObject(CONTROL_SIZES, { undefined: "" }),
        "",
      ),
  },
  input: {
    size: (title: string = "Size") =>
      select(title, iterableToSelectObject(INPUT_SIZES, { undefined: "" }), ""),
  },
  label: {
    size: (title: string = "Size") =>
      select(title, iterableToSelectObject(LABEL_SIZES, { undefined: "" }), ""),
  },
};

storiesOf("Form/Field", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Default", () => {
    const controlLoading = knobs.control.loading("Control loading");
    const controlSize = knobs.control.size("Control size (use with loading)");
    const helpColor = modifiersKnobs.color("Help color");
    const inputColor = modifiersKnobs.color("Input color");
    const inputSize = knobs.input.size("Input size");
    const labelSize = knobs.label.size("Label size");
    return (
      <Field>
        <Label size={labelSize || undefined}>Label</Label>
        <Control size={controlSize || undefined} loading={controlLoading}>
          <Input
            color={inputColor || undefined}
            placeholder="Text input"
            size={inputSize || undefined}
          />
        </Control>
        <Help color={helpColor || undefined}>This is a help text</Help>
      </Field>
    );
  })
  .add("With icons", () => {
    return (
      <Columns>
        <Columns.Column
          mobile={{ size: "full" }}
          tablet={{ size: "half" }}
          desktop={{ size: "one-third" }}
          fullhd={{ size: "one-quarter" }}
          widescreen={{ size: "one-fifth" }}
        >
          <Field>
            <Control iconLeft iconRight>
              <Input type="email" placeholder="Email" />
              <Icon size="small" align="left">
                <FontAwesomeIcon icon={faEnvelope} />
              </Icon>
              <Icon size="small" align="right">
                <FontAwesomeIcon icon={faCheck} />
              </Icon>
            </Control>
          </Field>

          <Field>
            <Control iconLeft>
              <Input type="password" placeholder="Password" />
              <Icon size="small" align="left">
                <FontAwesomeIcon icon={faLock} />
              </Icon>
            </Control>
          </Field>

          <Field>
            <Control iconLeft>
              <Select>
                <Select.Option selected>Country</Select.Option>
                <Select.Option>Select dropdown</Select.Option>
                <Select.Option>With Options</Select.Option>
              </Select>
              <Icon size="small" align="left">
                <FontAwesomeIcon icon={faGlobe} />
              </Icon>
            </Control>
          </Field>
        </Columns.Column>
      </Columns>
    );
  })
  .add("Field addon", () => {
    const align = knobs.align();
    const controlExpanded = knobs.control.loading("Control expanded");
    return (
      <div>
        <Field kind="addons" align={align || undefined}>
          <Control expanded={controlExpanded}>
            <Input placeholder="Find a repository" />
          </Control>
          <Control>
            <Button color="info">Search</Button>
          </Control>
        </Field>

        <Field kind="addons" align={align || undefined}>
          <Control expanded={controlExpanded}>
            <Select fullwidth={controlExpanded}>
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
          </Control>
          <Control>
            <Button color="primary">Choose</Button>
          </Control>
        </Field>

        <Field kind="addons" align={align || undefined}>
          <Control expanded={controlExpanded}>
            <Select>
              <Select.Option>$</Select.Option>
              <Select.Option>£</Select.Option>
              <Select.Option>€</Select.Option>
            </Select>
          </Control>
          <Control>
            <Input type="text" placeholder="Amount of money" />
          </Control>
          <Control>
            <Button color="primary">Transfer</Button>
          </Control>
        </Field>
      </div>
    );
  })
  .add("Field group", () => {
    const align = knobs.align();
    const expanded = knobs.control.expanded("Expanded (email)");
    return (
      <Field kind="group" align={align || undefined}>
        <Control expanded={expanded}>
          <Input type="email" placeholder="Email address" />
        </Control>
        <Control>
          <Button color="primary">Submit</Button>
        </Control>
        <Control>
          <Button color="light">Cancel</Button>
        </Control>
      </Field>
    );
  })
  .add("Field group (multiline)", () => {
    const expanded = knobs.control.expanded("Expanded (email)");
    return (
      <Columns>
        <Columns.Column
          mobile={{ size: "full" }}
          tablet={{ size: "half" }}
          desktop={{ size: "one-third" }}
          fullhd={{ size: "one-quarter" }}
          widescreen={{ size: "one-fifth" }}
        >
          <Field kind="group" multiline>
            {[
              "One",
              "Two",
              "Three",
              "Four",
              "Five",
              "Six",
              "Seven",
              "Eight",
              "Nine",
              "Ten",
              "Eleven",
              "Twelve",
              "Thirteen",
              "Fourteen",
              "Fifteen",
              "Sixteen",
              "Seventeen",
              "Eighteen",
              "Nineteen",
              "Twenty",
            ].map(name => (
              <Control expanded={expanded}>
                <Button key={name}>{name}</Button>
              </Control>
            ))}
          </Field>
        </Columns.Column>
      </Columns>
    );
  });
