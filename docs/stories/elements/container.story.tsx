import { select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { BREAKPOINTS } from "src/base/helpers/responsive";
import { Container, Notification } from "src/elements";
import { Section } from "src/layout";

import { filterUndefined, iterableToSelectObject } from "docs/stories/utils";

export const knobs = {
  breakapoint: (title: string = "Breakpoint") =>
    select(title, iterableToSelectObject(BREAKPOINTS, { undefined: "" }), ""),
};

storiesOf("Elements/Container", module)
  .add("Default", () => (
    <Section>
      <Container>
        <Notification>
          This container is <strong>centered</strong> on desktop.
        </Notification>
      </Container>
    </Section>
  ))
  .add("Fluid", () => (
    <Section>
      <Container fluid>
        <Notification>
          This container is <strong>fluid</strong>: it will have a 32px gap on
          either side, on any viewport size.
        </Notification>
      </Container>
    </Section>
  ))
  .add("Breakpoint", () => {
    const props = filterUndefined({
      breakpoint: knobs.breakapoint(),
    });

    const breakpointText =
      props.breakpoint === undefined ? "unset" : (props.breakpoint as string);

    return (
      <Section>
        <Container {...props}>
          <Notification>
            This container is <strong>fullwidth</strong> <em>until</em> the{" "}
            breakpoint: <code>{breakpointText}</code>
          </Notification>
        </Container>
      </Section>
    );
  });
