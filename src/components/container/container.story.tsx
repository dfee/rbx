import React from "react";

import { storiesOf } from "@storybook/react";

import { Container } from "@/components/container";
import { Heading } from "@/components/heading";
import { Section } from "@/components/section";

storiesOf("Container", module).add("Default", () => (
  <div>
    <Section>
      <Container>
        <p className="bd-notification is-success">
          <Heading<"p"> size={5} as="p">
            Default
          </Heading>
          <Heading<"p"> subtitle as="p">
            Container
          </Heading>
        </p>
      </Container>
    </Section>
    <Section>
      <Container fluid>
        <p className="bd-notification is-info">
          <Heading<"p"> size={5} as="p">
            Fluid
          </Heading>
          <Heading<"p"> subtitle as="p">
            Container
          </Heading>
        </p>
      </Container>
    </Section>
    <Section>
      <Container breakpoint="widescreen">
        <p className="bd-notification is-warning">
          <Heading<"p"> size={5} as="p">
            Breakpoint Widescreen
          </Heading>
          <Heading<"p"> subtitle as="p">
            Container
          </Heading>
        </p>
      </Container>
    </Section>
    <Section>
      <Container breakpoint="fullhd">
        <p className="bd-notification is-danger">
          <Heading<"p"> size={5} as="p">
            Breakpoint Fullhd
          </Heading>
          <Heading<"p"> subtitle as="p">
            Container
          </Heading>
        </p>
      </Container>
    </Section>
  </div>
));
