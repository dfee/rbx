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

import {
  Button,
  Control,
  Field,
  Help,
  Icon,
  Input,
  Label,
  Select,
} from "@/elements";
import { CONTROL_SIZES } from "@/elements/form/control";
import { FIELD_ALIGNMENTS } from "@/elements/form/field";
import { INPUT_SIZES } from "@/elements/form/input";
import { LABEL_SIZES } from "@/elements/form/label";
import { Columns } from "@/grid";
import { Section } from "@/layout";

import { iterableToSelectObject } from "../../helpers";
import { colorKnob } from "../../modifiers";

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

storiesOf("Elements/Form/Field", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Default", () => {
    const controlLoading = knobs.control.loading("Control loading");
    const controlSize = knobs.control.size("Control size (use with loading)");
    const helpColor = colorKnob("Help color");
    const inputColor = colorKnob("Input color");
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
                <select>
                  <option selected>Country</option>
                  <option>Select dropdown</option>
                  <option>With Options</option>
                </select>
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
            <Select.Container fullwidth={controlExpanded}>
              <select>
                <option value="Argentina">Argentina</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Brazil">Brazil</option>
                <option value="Chile">Chile</option>
                <option value="Colombia">Colombia</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Guyana">Guyana</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Peru">Peru</option>
                <option value="Suriname">Suriname</option>
                <option value="Uruguay">Uruguay</option>
                <option value="Venezuela">Venezuela</option>
              </select>
            </Select.Container>
          </Control>
          <Control>
            <Button color="primary">Choose</Button>
          </Control>
        </Field>

        <Field kind="addons" align={align || undefined}>
          <Control expanded={controlExpanded}>
            <Select.Container>
              <select>
                <option>$</option>
                <option>£</option>
                <option>€</option>
              </select>
            </Select.Container>
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
