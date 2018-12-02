import React from "react";

import { storiesOf } from "@storybook/react";

import { Title } from "@/elements";
import { Container } from "@/layout/container";
import { Section } from "@/layout/section";

storiesOf("Layout/Container", module).add("Default", () => (
  <div>
    <Section>
      <Container>
        <p className="bd-notification is-success">
          <Title<"p"> size={5} as="p">
            Default
          </Title>
          <Title<"p"> subtitle as="p">
            Container
          </Title>
        </p>
      </Container>
    </Section>
    <Section>
      <Container fluid>
        <p className="bd-notification is-info">
          <Title<"p"> size={5} as="p">
            Fluid
          </Title>
          <Title<"p"> subtitle as="p">
            Container
          </Title>
        </p>
      </Container>
    </Section>
    <Section>
      <Container breakpoint="widescreen">
        <p className="bd-notification is-warning">
          <Title<"p"> size={5} as="p">
            Breakpoint Widescreen
          </Title>
          <Title<"p"> subtitle as="p">
            Container
          </Title>
        </p>
      </Container>
    </Section>
    <Section>
      <Container breakpoint="fullhd">
        <p className="bd-notification is-danger">
          <Title<"p"> size={5} as="p">
            Breakpoint Fullhd
          </Title>
          <Title<"p"> subtitle as="p">
            Container
          </Title>
        </p>
      </Container>
    </Section>
  </div>
));
