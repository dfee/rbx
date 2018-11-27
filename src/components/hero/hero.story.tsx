import React from "react";

import { storiesOf } from "@storybook/react";

import { Container } from "components/container";
import { Heading } from "components/heading";
import { Hero } from "components/hero";
import { Section } from "components/section";

storiesOf("Hero", module)
  .add("Default with color", () => (
    <div>
      <Section>
        <Hero color={"primary" as "primary"}>
          <Hero.Body>
            <Container>
              <Heading>Hero title Primary</Heading>
              <Heading subtitle size={3 as 3}>
                Subtitle
              </Heading>
            </Container>
          </Hero.Body>
        </Hero>
      </Section>

      <Section>
        <Hero color={"danger" as "danger"}>
          <Hero.Body>
            <Container>
              <Heading>Hero title Danger</Heading>
              <Heading subtitle size={3 as 3}>
                Subtitle
              </Heading>
            </Container>
          </Hero.Body>
        </Hero>
      </Section>
      <Section>
        <Hero color={"info" as "info"}>
          <Hero.Body>
            <Container>
              <Heading>Hero title Info</Heading>
              <Heading subtitle size={3 as 3}>
                Subtitle
              </Heading>
            </Container>
          </Hero.Body>
        </Hero>
      </Section>
    </div>
  ))
  .add("Gradient (EXPERIMENTAL)", () => (
    <div>
      <Section>
        <Hero color={"primary" as "primary"} gradient>
          <Hero.Body>
            <Container>
              <Heading>Hero title Primary</Heading>
              <Heading subtitle size={3 as 3}>
                Subtitle
              </Heading>
            </Container>
          </Hero.Body>
        </Hero>
      </Section>

      <Section>
        <Hero color={"danger" as "danger"} gradient>
          <Hero.Body>
            <Container>
              <Heading>Hero title Danger</Heading>
              <Heading subtitle size={3 as 3}>
                Subtitle
              </Heading>
            </Container>
          </Hero.Body>
        </Hero>
      </Section>
      <Section>
        <Hero color={"info" as "info"} gradient>
          <Hero.Body>
            <Container>
              <Heading>Hero title Info</Heading>
              <Heading subtitle size={3 as 3}>
                Subtitle
              </Heading>
            </Container>
          </Hero.Body>
        </Hero>
      </Section>
    </div>
  ))
  .add("Differents Sizes", () => (
    <div>
      <Hero color={"primary" as "primary"} size={"medium" as "medium"}>
        <Hero.Body>Medium</Hero.Body>
      </Hero>
      <Hero color={"info" as "info"} size={"large" as "large"}>
        <Hero.Body>Large</Hero.Body>
      </Hero>
      <Hero color={"danger" as "danger"} size={"fullheight" as "fullheight"}>
        <Hero.Body>FULL HEIGHT</Hero.Body>
      </Hero>
    </div>
  ))
  .add("Vertical Alignments", () => (
    <Hero size={"fullheight" as "fullheight"} color={"primary" as "primary"}>
      <Hero.Head renderAs="header">
        <div className="bd-notification is-info">Header</div>
      </Hero.Head>
      <Hero.Body>Body</Hero.Body>
      <Hero.Footer>
        <div className="bd-notification is-danger">Footer</div>
      </Hero.Footer>
    </Hero>
  ));
