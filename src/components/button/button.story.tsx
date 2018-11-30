import { action } from "@storybook/addon-actions";
import { boolean, select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Box } from "@/components/box";
import { Button } from "@/components/button";
import { ButtonGroupProps } from "@/components/button/button-group";
import { Section } from "@/components/section";
import { COLORS, Colors } from "@/modifiers/color";

const makeColorSelect = () =>
  select(
    "Colors",
    {
      Default: "",
      ...Object.assign(
        {},
        ...COLORS.map((color: string) => ({ [color]: color })),
      ),
    },
    "Default",
  );

const makePositionSelect = () =>
  select(
    "position",
    {
      Default: "",
      centered: "centered",
      right: "right",
    },
    "default",
  );

storiesOf("Button", module)
  .addDecorator(story => <div className="button-display">{story()}</div>)
  .add("Default", () => (
    <Section>
      <Box>
        Play with the button props using the knobs addon panel at the bottom
      </Box>
      <Button
        color={makeColorSelect() as Colors}
        disabled={boolean("Disabled", false)}
        fullwidth={boolean("Full width", false)}
        inverted={boolean("Inverted", false)}
        isStatic={boolean("Static", false)}
        loading={boolean("Loading", false)}
        onClick={action("Button Click")}
        onMouseEnter={action("Hover")}
        outlined={boolean("Outlined", false)}
        remove={boolean("Remove", false)}
        rounded={boolean("Rounded", false)}
        text={boolean("Text", false)}
      >
        Button
      </Button>
    </Section>
  ))
  .add("As another React element", () => {
    interface CustomComponentProps {
      customProp: string;
      children: React.ReactNode;
      className?: string;
    }

    const CustomComponent: React.FC<CustomComponentProps> = ({
      customProp,
      children,
      className,
    }) => (
      <a className={className} href={customProp}>
        {children}
      </a>
    );

    return (
      <Section>
        <Button<typeof CustomComponent>
          as={CustomComponent}
          color="info"
          customProp="https://github.com/dfee/rbx"
        >
          Button rendered using another React Component with props
        </Button>
      </Section>
    );
  })
  .add("Button group", () => (
    <Section>
      <Button.Group
        hasAddons={boolean("hasAddons", false)}
        position={makePositionSelect() as ButtonGroupProps["position"]}
      >
        <Button<"span"> as="span" color="success">
          Save changes
        </Button>
        <Button<"span"> as="span" color="info">
          Save and continue
        </Button>
        <Button<"span"> as="span" color="danger">
          Cancel
        </Button>
      </Button.Group>
    </Section>
  ))
  .add("Ref forwarding", () => {
    const ref = React.createRef<HTMLButtonElement>();

    return (
      <Section>
        <Button onClick={() => ref.current!.click()}>click other button</Button>
        <Button ref={ref} onClick={() => action("clicked")}>
          this will be clicked
        </Button>
      </Section>
    );
  });
