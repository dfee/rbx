import { select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Notification } from "@/elements";
import { Container } from "@/layout/container";
import { Section } from "@/layout/section";
import { BREAKPOINTS } from "@/modifiers/responsive";

import { iterableToSelectObject } from "../helpers";

export const knobs = {
  breakapoint: (title: string = "Breakpoint") =>
    select(title, iterableToSelectObject(BREAKPOINTS, { undefined: "" }), ""),
};

storiesOf("Layout/Container", module)
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
    const breakpoint = knobs.breakapoint();
    return (
      <Section>
        <Container breakpoint={breakpoint || undefined}>
          <Notification>
            This container is <strong>fullwidth</strong> <em>until</em> the{" "}
            <code>{breakpoint === "" ? "undefined" : breakpoint}</code>{" "}
            breakpoint.
          </Notification>
        </Container>
      </Section>
    );
  });
