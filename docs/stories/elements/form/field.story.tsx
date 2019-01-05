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
} from "src/elements";
import { CONTROL_SIZES } from "src/elements/form/control";
import { FIELD_ALIGNMENTS } from "src/elements/form/field";
import { INPUT_SIZES } from "src/elements/form/input";
import { LABEL_SIZES } from "src/elements/form/label";
import { Columns } from "src/grid";
import { Section } from "src/layout";

import { colorKnob } from "docs/stories/common";
import { filterUndefined, iterableToSelectObject } from "docs/stories/utils";

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
    const labelProps = filterUndefined({
      size: knobs.label.size("Label size"),
    });

    const controlProps = filterUndefined({
      loading: knobs.control.loading("Control loading"),
      size: knobs.control.size("Control size (use with loading)"),
    });

    const inputProps = filterUndefined({
      color: colorKnob("Input color"),
      size: knobs.input.size("Input size"),
    });

    const helpProps = filterUndefined({
      color: colorKnob("Help color"),
    });

    return (
      <Field>
        <Label {...labelProps}>Label</Label>
        <Control {...controlProps}>
          <Input {...inputProps} placeholder="Text input" />
        </Control>
        <Help {...helpProps}>This is a help text</Help>
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
              <Select.Container>
                <Select>
                  <Select.Option selected aria-selected>
                    Country
                  </Select.Option>
                  <Select.Option aria-selected={false}>
                    Select dropdown
                  </Select.Option>
                  <Select.Option aria-selected={false}>
                    With Options
                  </Select.Option>
                </Select>
              </Select.Container>
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
    const fieldProps = filterUndefined({
      align: knobs.align(),
    });

    const controlProps = {
      expanded: knobs.control.expanded("Expanded (control"),
    };

    return (
      <div>
        <Field kind="addons" {...fieldProps}>
          <Control {...controlProps}>
            <Input placeholder="Find a repository" />
          </Control>
          <Control>
            <Button color="info">Search</Button>
          </Control>
        </Field>

        <Field kind="addons" {...fieldProps}>
          <Control {...controlProps}>
            <Select.Container fullwidth={controlProps.expanded}>
              <select>
                <option value="Argentina" aria-selected={false}>
                  Argentina
                </option>
                <option value="Bolivia" aria-selected={false}>
                  Bolivia
                </option>
                <option value="Brazil" aria-selected={false}>
                  Brazil
                </option>
                <option value="Chile" aria-selected={false}>
                  Chile
                </option>
                <option value="Colombia" aria-selected={false}>
                  Colombia
                </option>
                <option value="Ecuador" aria-selected={false}>
                  Ecuador
                </option>
                <option value="Guyana" aria-selected={false}>
                  Guyana
                </option>
                <option value="Paraguay" aria-selected={false}>
                  Paraguay
                </option>
                <option value="Peru" aria-selected={false}>
                  Peru
                </option>
                <option value="Suriname" aria-selected={false}>
                  Suriname
                </option>
                <option value="Uruguay" aria-selected={false}>
                  Uruguay
                </option>
                <option value="Venezuela" aria-selected={false}>
                  Venezuela
                </option>
              </select>
            </Select.Container>
          </Control>
          <Control>
            <Button color="primary">Choose</Button>
          </Control>
        </Field>

        <Field kind="addons" {...fieldProps}>
          <Control {...controlProps}>
            <Select.Container>
              <select>
                <option aria-selected={false}>$</option>
                <option aria-selected={false}>£</option>
                <option aria-selected={false}>€</option>
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
    const fieldProps = filterUndefined({
      align: knobs.align(),
    });

    const controlProps = {
      expanded: knobs.control.expanded("Expanded (email)"),
    };

    return (
      <Field kind="group" {...fieldProps}>
        <Control {...controlProps}>
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
    const controlProps = {
      expanded: knobs.control.expanded("Expanded (email)"),
    };

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
              <Control {...controlProps}>
                <Button key={name}>{name}</Button>
              </Control>
            ))}
          </Field>
        </Columns.Column>
      </Columns>
    );
  });
