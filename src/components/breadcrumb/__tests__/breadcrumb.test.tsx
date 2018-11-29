import React from "react";
import renderer from "react-test-renderer";

import { Breadcrumb, BreadcrumbProps } from "../breadcrumb";

describe("Breadcrumb component", () => {
  it("Should be a Breadcrumb", () => {
    const component = renderer.create(
      <Breadcrumb
        items={[
          {
            name: "Home",
            url: "/",
          },
          {
            name: "Section",
            url: "/section",
          },
          {
            active: true,
            name: "Details",
            url: "/detail",
          },
        ]}
      />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  [undefined, "identifier"].map(hrefAttr =>
    it(`Should ${
      hrefAttr ? "" : "not "
    }pass along item.url as hrefAttr prop on 'as' component when hrefAttr is ${
      hrefAttr ? "" : "not "
    }supplied`, () => {
      interface CustomProps {
        identifier?: string;
      }
      const Custom: React.FC<CustomProps> = ({ identifier }) => (
        <div>{identifier}</div>
      );

      const component = renderer.create(
        <Breadcrumb<typeof Custom>
          as={Custom}
          hrefAttr={hrefAttr}
          items={[
            {
              name: "Storybook",
              url: "#1",
            },
            {
              name: "Breadcrumb",
              url: "#2",
            },
            {
              active: true,
              name: "Breadcrumb Types",
              url: "#3",
            },
          ]}
        />,
      );
      expect(component.toJSON()).toMatchSnapshot();
    }),
  );

  [null, "arrow", "dot", "bullet", "succeeds"].map(separator =>
    it(`should use separator ${separator}`, () => {
      const component = renderer.create(
        <Breadcrumb
          separator={separator as BreadcrumbProps["separator"]}
          items={[
            {
              name: "Storybook",
              url: "#1",
            },
            {
              name: "Breadcrumb",
              url: "#2",
            },
            {
              active: true,
              name: "Breadcrumb Types",
              url: "#3",
            },
          ]}
        />,
      );
      expect(component.toJSON()).toMatchSnapshot();
    }),
  );

  it("Should use inline style and custom size", () => {
    const component = renderer.create(
      <Breadcrumb
        style={{ marginTop: 10 }}
        size="large"
        items={[
          {
            name: "Home",
            url: "/",
          },
          {
            name: "Section",
            url: "/section",
          },
          {
            active: true,
            name: "Details",
            url: "/detail",
          },
        ]}
      />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
