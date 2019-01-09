import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import {
  Columns,
  Container,
  Content,
  Footer,
  Hero,
  Icon,
  Image,
  Media,
  Navbar,
  Title,
} from "src/";

import "./App.sass";
// tslint:disable: match-default-export-name
import BulmaLogo from "./assets/bulma.png";
import GitHubLogo from "./assets/github.png";
import NPMLogo from "./assets/npm.png";
import ReactLogo from "./assets/react.png";
import StorybookLogo from "./assets/storybook.png";
import TypescriptLogo from "./assets/typescript.png";
// tslint:enbale: match-default-export-name

const PATH_ROOT = "/rbx";
const PATH_STORIES = `${PATH_ROOT}/stories`;

const AppNavbar: React.FC = () => (
  <Container>
    <Navbar>
      <Navbar.Brand>
        <Navbar.Item href={PATH_ROOT} textSize={4} textWeight="bold">
          <span role="img" aria-label="logo">
            👟
          </span>
          <span style={{ marginLeft: "5px" }}>rbx</span>
        </Navbar.Item>
        <Navbar.Burger />
      </Navbar.Brand>

      <Navbar.Menu>
        <Navbar.Segment align="end">
          <Navbar.Item href={PATH_STORIES}>
            <Icon>
              <FontAwesomeIcon icon={faBook} />
            </Icon>
            <span>Storybook</span>
          </Navbar.Item>
          <Navbar.Item href="https://github.com/dfee/rbx">
            <Icon>
              <FontAwesomeIcon icon={faGithub} />
            </Icon>
            <span>GitHub</span>
          </Navbar.Item>

          <Navbar.Item dropdown>
            <Navbar.Link>More</Navbar.Link>
            <Navbar.Dropdown align="right">
              <Navbar.Item href="https://bulma.io">Bulma</Navbar.Item>
              <Navbar.Item href="https://www.typescriptlang.org/">
                Typescript
              </Navbar.Item>
              <Navbar.Divider />
              <Navbar.Item href="https://github.com/dfee/rbx/issues">
                Report an issue
              </Navbar.Item>
            </Navbar.Dropdown>
          </Navbar.Item>
        </Navbar.Segment>
      </Navbar.Menu>
    </Navbar>
  </Container>
);

const AppHero: React.FC = () => (
  <Container>
    <Hero>
      <Hero.Body>
        <Container>
          <Title textColor="primary">Welcome to rbx</Title>
          <Title as="h2" subtitle textColor="grey-dark">
            The Comprehensive <strong>Bulma UI</strong> Framework for{" "}
            <strong>React</strong>.
          </Title>
        </Container>
      </Hero.Body>
    </Hero>
  </Container>
);

const Feature: React.FC<{
  children: React.ReactNode;
  imageSrc: string;
  title: string;
  to: string;
}> = ({ children, imageSrc, title, to }) => (
  <Columns.Column size="half" mobile={{ size: "full" }}>
    <Media>
      <Media.Item as="figure" align="left">
        <Image.Container as="a" href={to} size={64} target="_blank">
          <Image src={imageSrc} />
        </Image.Container>
      </Media.Item>

      <Media.Item align="content">
        <Title
          as="a"
          href={to}
          size={5}
          style={{ marginBottom: "5px" }}
          target="_blank"
        >
          {title}
        </Title>
        {children}
      </Media.Item>
    </Media>
  </Columns.Column>
);

const AppFeatures: React.FC = () => (
  <Container>
    <Columns>
      <Feature to="https://reactjs.org/" imageSrc={ReactLogo} title="React 16+">
        <p>Built for the latest major version of React.</p>
        <p>
          All components are minimal but flexible, support ref-forwarding, and
          are renderable as any other component.
        </p>
      </Feature>

      <Feature to="https://bulma.io/" imageSrc={BulmaLogo} title="Bulma 0.7.2">
        <p>Fully compatible with the latest Bulma.</p>
        <p>
          The grid and all layouts, elements, and components are fully
          supported.
        </p>
      </Feature>

      <Feature to={PATH_STORIES} imageSrc={StorybookLogo} title="Storybook">
        <p>All components have exhaustive stories.</p>
        <p>
          You can view the story's source by clicking the <strong>info</strong>{" "}
          button in the top-right.
        </p>
      </Feature>

      <Feature
        to="https://www.typescriptlang.org/"
        imageSrc={TypescriptLogo}
        title="Typescript 3"
      >
        <p>Written with type safety first.</p>
        <p>
          If you use TypeScript, be prepared for some awesome type support. If
          not, <strong>PropTypes</strong> are built in.
        </p>
      </Feature>

      <Feature
        to="https://github.com/dfee/rbx"
        imageSrc={GitHubLogo}
        title="Available on GitHub"
      >
        <p>Released with the permissive MIT License.</p>
        <p>
          In addition, the code carries 100% test coverage and is open for
          contributions!
        </p>
      </Feature>

      <Feature
        to="https://www.npmjs.com/package/rbx"
        imageSrc={NPMLogo}
        title="Published on NPM"
      >
        <pre>npm install rbx # install it now!</pre>
      </Feature>
    </Columns>
  </Container>
);

const AppFooter: React.FC = () => (
  <Footer>
    <Content textAlignment="centered">
      <p>
        <strong>rbx</strong> by <a href="https://github.com/dfee">Devin Fee</a>.
        The source code is released under the{" "}
        <a href="https://opensource.org/licenses/mit-license.php">
          MIT License
        </a>
        . The website content is licensed{" "}
        <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
          CC BY NC SA 4.0
        </a>
        .
      </p>
    </Content>
  </Footer>
);

export const App: React.FC = () => (
  <div className="App">
    <div style={{ minHeight: "calc(100vh - 168px)", paddingBottom: "100px" }}>
      <AppNavbar />
      <AppHero />
      <AppFeatures />
    </div>
    <AppFooter />
  </div>
);
