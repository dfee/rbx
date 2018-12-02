import React from "react";

import { storiesOf } from "@storybook/react";

import { Title } from "@/elements";
import { Container, Hero, Section } from "@/layout";

storiesOf("Layout/Hero", module)
  .add("Default with color", () => (
    <div>
      <Section>
        <Hero color="primary">
          <Hero.Body>
            <Container>
              <Title>Hero title Primary</Title>
              <Title subtitle size={3}>
                Subtitle
              </Title>
            </Container>
          </Hero.Body>
        </Hero>
      </Section>

      <Section>
        <Hero color="danger">
          <Hero.Body>
            <Container>
              <Title>Hero title Danger</Title>
              <Title subtitle size={3}>
                Subtitle
              </Title>
            </Container>
          </Hero.Body>
        </Hero>
      </Section>
      <Section>
        <Hero color="info">
          <Hero.Body>
            <Container>
              <Title>Hero title Info</Title>
              <Title subtitle size={3}>
                Subtitle
              </Title>
            </Container>
          </Hero.Body>
        </Hero>
      </Section>
    </div>
  ))
  .add("Gradient (EXPERIMENTAL)", () => (
    <div>
      <Section>
        <Hero color="primary" gradient>
          <Hero.Body>
            <Container>
              <Title>Hero title Primary</Title>
              <Title subtitle size={3}>
                Subtitle
              </Title>
            </Container>
          </Hero.Body>
        </Hero>
      </Section>

      <Section>
        <Hero color="danger" gradient>
          <Hero.Body>
            <Container>
              <Title>Hero title Danger</Title>
              <Title subtitle size={3}>
                Subtitle
              </Title>
            </Container>
          </Hero.Body>
        </Hero>
      </Section>
      <Section>
        <Hero color="info" gradient>
          <Hero.Body>
            <Container>
              <Title>Hero title Info</Title>
              <Title subtitle size={3}>
                Subtitle
              </Title>
            </Container>
          </Hero.Body>
        </Hero>
      </Section>
    </div>
  ))
  .add("Differents Sizes", () => (
    <div>
      <Hero color="primary" size="medium">
        <Hero.Body>Medium</Hero.Body>
      </Hero>
      <Hero color="info" size="large">
        <Hero.Body>Large</Hero.Body>
      </Hero>
      <Hero color="danger" size="fullheight">
        <Hero.Body>FULL HEIGHT</Hero.Body>
      </Hero>
    </div>
  ))
  .add("Vertical Alignments", () => (
    <Hero size="fullheight" color="primary">
      <Hero.Head<"header"> as="header">
        <div className="bd-notification is-info">Header</div>
      </Hero.Head>
      <Hero.Body>Body</Hero.Body>
      <Hero.Footer>
        <div className="bd-notification is-danger">Footer</div>
      </Hero.Footer>
    </Hero>
  ));
