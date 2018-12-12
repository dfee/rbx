import { storiesOf } from "@storybook/react";
import React from "react";

import { Box, Content, Image, Title } from "@/elements";
import { Tile } from "@/grid";
import { Section } from "@/layout";

storiesOf("Grid/Tiles", module)
  .add("Default", () => (
    <Section>
      <Tile kind="ancestor">
        <Tile size={8} vertical>
          <Tile>
            <Tile kind="parent" vertical>
              <Tile as="article" kind="child" notification color="primary">
                <Title>Vertical...</Title>
                <Title subtitle>Top tile</Title>
              </Tile>
              <Tile as="article" kind="child" notification color="warning">
                <Title>Tiles...</Title>
                <Title subtitle>Bottom Tile...</Title>
              </Tile>
            </Tile>
            <Tile kind="parent">
              <Tile as="article" kind="child" notification color="info">
                <Title>Middle Tile...</Title>
                <Title subtitle>With an image</Title>
                <Image.Container size="4by3">
                  <Image src="http://bulma.io/images/placeholders/640x480.png" />
                </Image.Container>
              </Tile>
            </Tile>
          </Tile>
          <Tile kind="parent">
            <Tile as="article" kind="child" notification color="danger">
              <Title>Wide tile</Title>
              <Title subtitle>Aligned with the right tile</Title>
              <Content>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  ornare magna eros, eu pellentesque tortor vestibulum ut.
                  Maecenas non massa sem. Etiam finibus odio quis feugiat
                  facilisis.
                </p>
              </Content>
            </Tile>
          </Tile>
        </Tile>
        <Tile kind="parent">
          <Tile as="article" kind="child" notification color="success">
            <Content>
              <Title>Tall tile</Title>
              <Title subtitle>With even more content</Title>
              <Content>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  semper diam at erat pulvinar, at pulvinar felis blandit.
                  Vestibulum volutpat tellus diam, consequat gravida libero
                  rhoncus ut. Morbi maximus, leo sit amet vehicula eleifend,
                  nunc dui porta orci, quis semper odio felis ut quam.
                </p>
                <p>
                  Suspendisse varius ligula in molestie lacinia. Maecenas varius
                  eget ligula a sagittis. Pellentesque interdum, nisl nec
                  interdum maximus, augue diam porttitor lorem, et sollicitudin
                  felis neque sit amet erat. Maecenas imperdiet felis nisi,
                  fringilla luctus felis hendrerit sit amet. Aenean vitae
                  gravida diam, finibus dignissim turpis. Sed eget varius
                  ligula, at volutpat tortor.
                </p>
                <p>
                  Integer sollicitudin, tortor a mattis commodo, velit urna
                  rhoncus erat, vitae congue lectus dolor consequat libero.
                  Donec leo ligula, maximus et pellentesque sed, gravida a
                  metus. Cras ullamcorper a nunc ac porta. Aliquam ut aliquet
                  lacus, quis faucibus libero. Quisque non semper leo.
                </p>
              </Content>
            </Content>
          </Tile>
        </Tile>
      </Tile>
    </Section>
  ))
  .add("3 columns", () => (
    <Section>
      <Tile kind="ancestor">
        <Tile kind="parent">
          <Tile as={Box} kind="child">
            <Title as="p">Hello world</Title>
            <Title as="p" subtitle>
              What is up?
            </Title>
          </Tile>
        </Tile>
        <Tile kind="parent">
          <Tile as={Box} kind="child">
            <Title as="p">Foo</Title>
            <Title as="p" subtitle>
              Bar
            </Title>
          </Tile>
        </Tile>
        <Tile kind="parent">
          <Tile as={Box} kind="child">
            <Title as="p">Third column</Title>
            <Title as="p" subtitle>
              With some content
            </Title>
            <Content>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                ornare magna eros, eu pellentesque tortor vestibulum ut.
                Maecenas non massa sem. Etiam finibus odio quis feugiat
                facilisis.
              </p>
            </Content>
          </Tile>
        </Tile>
      </Tile>
      <Tile kind="ancestor">
        <Tile vertical size={8}>
          <Tile>
            <Tile kind="parent" vertical>
              <Tile as={Box} kind="child">
                <Title as="p">Vertical titles</Title>
                <Title as="p" subtitle>
                  Top box
                </Title>
              </Tile>
              <Tile as={Box} kind="child">
                <Title as="p">Vertical titles</Title>
                <Title as="p" subtitle>
                  Bottom box
                </Title>
              </Tile>
            </Tile>
            <Tile kind="parent">
              <Tile as={Box} kind="child">
                <Title as="p">Middle box</Title>
                <Title as="p" subtitle>
                  With an image
                </Title>
                <Image.Container size="4by3">
                  <Image src="https://bulma.io/images/placeholders/640x480.png" />
                </Image.Container>
              </Tile>
            </Tile>
          </Tile>
          <Tile kind="parent">
            <Tile as={Box} kind="child">
              <Title as="p">Wide column</Title>
              <Title as="p" subtitle>
                Aligned with the right column
              </Title>
              <Content>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  ornare magna eros, eu pellentesque tortor vestibulum ut.
                  Maecenas non massa sem. Etiam finibus odio quis feugiat
                  facilisis.
                </p>
              </Content>
            </Tile>
          </Tile>
        </Tile>
        <Tile kind="parent">
          <Tile as={Box} kind="child">
            <Content>
              <Title as="p">Tall column</Title>
              <Title as="p" subtitle>
                With even more content
              </Title>
              <Content>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  semper diam at erat pulvinar, at pulvinar felis blandit.
                  Vestibulum volutpat tellus diam, consequat gravida libero
                  rhoncus ut. Morbi maximus, leo sit amet vehicula eleifend,
                  nunc dui porta orci, quis semper odio felis ut quam.
                </p>
                <p>
                  Suspendisse varius ligula in molestie lacinia. Maecenas varius
                  eget ligula a sagittis. Pellentesque interdum, nisl nec
                  interdum maximus, augue diam porttitor lorem, et sollicitudin
                  felis neque sit amet erat. Maecenas imperdiet felis nisi,
                  fringilla luctus felis hendrerit sit amet. Aenean vitae
                  gravida diam, finibus dignissim turpis. Sed eget varius
                  ligula, at volutpat tortor.
                </p>
                <p>
                  Integer sollicitudin, tortor a mattis commodo, velit urna
                  rhoncus erat, vitae congue lectus dolor consequat libero.
                  Donec leo ligula, maximus et pellentesque sed, gravida a
                  metus. Cras ullamcorper a nunc ac porta. Aliquam ut aliquet
                  lacus, quis faucibus libero. Quisque non semper leo.
                </p>
              </Content>
            </Content>
          </Tile>
        </Tile>
      </Tile>
      <Tile kind="ancestor">
        <Tile kind="parent">
          <Tile as={Box} kind="child">
            <Title as="p">Side column</Title>
            <Title as="p" subtitle>
              With some content
            </Title>
            <Content>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                ornare magna eros, eu pellentesque tortor vestibulum ut.
                Maecenas non massa sem. Etiam finibus odio quis feugiat
                facilisis.
              </p>
            </Content>
          </Tile>
        </Tile>
        <Tile kind="parent" size={8}>
          <Tile as={Box} kind="child">
            <Title as="p">Main column</Title>
            <Title as="p" subtitle>
              With some content
            </Title>
            <Content>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                ornare magna eros, eu pellentesque tortor vestibulum ut.
                Maecenas non massa sem. Etiam finibus odio quis feugiat
                facilisis.
              </p>
            </Content>
          </Tile>
        </Tile>
      </Tile>
    </Section>
  ))
  .add("4 columns", () => (
    <Section>
      <Tile kind="ancestor">
        <Tile kind="parent">
          <Tile as={Box} kind="child">
            <Title as="p">One</Title>
            <Title as="p" subtitle>
              Subtitle
            </Title>
          </Tile>
        </Tile>
        <Tile kind="parent">
          <Tile as={Box} kind="child">
            <Title as="p">Two</Title>
            <Title as="p" subtitle>
              Subtitle
            </Title>
          </Tile>
        </Tile>
        <Tile kind="parent">
          <Tile as={Box} kind="child">
            <Title as="p">Three</Title>
            <Title as="p" subtitle>
              Subtitle
            </Title>
          </Tile>
        </Tile>
        <Tile kind="parent">
          <Tile as={Box} kind="child">
            <Title as="p">Four</Title>
            <Title as="p" subtitle>
              Subtitle
            </Title>
          </Tile>
        </Tile>
      </Tile>

      <Tile kind="ancestor">
        <Tile vertical size={9}>
          <Tile>
            <Tile kind="parent">
              <Tile as={Box} kind="child">
                <Title as="p">Five</Title>
                <Title as="p" subtitle>
                  Subtitle
                </Title>
                <Content>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam semper diam at erat pulvinar, at pulvinar felis
                    blandit. Vestibulum volutpat tellus diam, consequat gravida
                    libero rhoncus ut. Morbi maximus, leo sit amet vehicula
                    eleifend, nunc dui porta orci, quis semper odio felis ut
                    quam.
                  </p>
                </Content>
              </Tile>
            </Tile>
            <Tile vertical size={8}>
              <Tile>
                <Tile kind="parent">
                  <Tile as={Box} kind="child">
                    <Title as="p">Six</Title>
                    <Title as="p" subtitle>
                      Subtitle
                    </Title>
                  </Tile>
                </Tile>
                <Tile kind="parent">
                  <Tile as={Box} kind="child">
                    <Title as="p">Seven</Title>
                    <Title as="p" subtitle>
                      Subtitle
                    </Title>
                  </Tile>
                </Tile>
              </Tile>
              <Tile kind="parent">
                <Tile as={Box} kind="child">
                  <Title as="p">Eight</Title>
                  <Title as="p" subtitle>
                    Subtitle
                  </Title>
                </Tile>
              </Tile>
            </Tile>
          </Tile>
          <Tile>
            <Tile kind="parent" size={8}>
              <Tile as={Box} kind="child">
                <Title as="p">Nine</Title>
                <Title as="p" subtitle>
                  Subtitle
                </Title>
                <Content>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Proin ornare magna eros, eu pellentesque tortor vestibulum
                    ut. Maecenas non massa sem. Etiam finibus odio quis feugiat
                    facilisis.
                  </p>
                </Content>
              </Tile>
            </Tile>
            <Tile kind="parent">
              <Tile as={Box} kind="child">
                <Title as="p">Ten</Title>
                <Title as="p" subtitle>
                  Subtitle
                </Title>
                <Content>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Proin ornare magna eros, eu pellentesque tortor vestibulum
                    ut. Maecenas non massa sem. Etiam finibus odio quis feugiat
                    facilisis.
                  </p>
                </Content>
              </Tile>
            </Tile>
          </Tile>
        </Tile>
        <Tile kind="parent">
          <Tile as={Box} kind="child">
            <Content>
              <Title as="p">Eleven</Title>
              <Title as="p" subtitle>
                Subtitle
              </Title>
              <Content>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  semper diam at erat pulvinar, at pulvinar felis blandit.
                  Vestibulum volutpat tellus diam, consequat gravida libero
                  rhoncus ut. Morbi maximus, leo sit amet vehicula eleifend,
                  nunc dui porta orci, quis semper odio felis ut quam.
                </p>
                <p>
                  Integer sollicitudin, tortor a mattis commodo, velit urna
                  rhoncus erat, vitae congue lectus dolor consequat libero.
                  Donec leo ligula, maximus et pellentesque sed, gravida a
                  metus. Cras ullamcorper a nunc ac porta. Aliquam ut aliquet
                  lacus, quis faucibus libero. Quisque non semper leo.
                </p>
              </Content>
            </Content>
          </Tile>
        </Tile>
      </Tile>

      <Tile kind="ancestor">
        <Tile kind="parent">
          <Tile as={Box} kind="child">
            <Title as="p">Twelve</Title>
            <Title as="p" subtitle>
              Subtitle
            </Title>
            <Content>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                ornare magna eros, eu pellentesque tortor vestibulum ut.
              </p>
            </Content>
          </Tile>
        </Tile>
        <Tile kind="parent" size={6}>
          <Tile as={Box} kind="child">
            <Title as="p">Thirteen</Title>
            <Title as="p" subtitle>
              Subtitle
            </Title>
            <Content>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                ornare magna eros, eu pellentesque tortor vestibulum ut.
                Maecenas non massa sem. Etiam finibus odio quis feugiat
                facilisis.
              </p>
            </Content>
          </Tile>
        </Tile>
        <Tile kind="parent">
          <Tile as={Box} kind="child">
            <Title as="p">Fourteen</Title>
            <Title as="p" subtitle>
              Subtitle
            </Title>
            <Content>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                ornare magna eros, eu pellentesque tortor vestibulum ut.
              </p>
            </Content>
          </Tile>
        </Tile>
      </Tile>
    </Section>
  ));
