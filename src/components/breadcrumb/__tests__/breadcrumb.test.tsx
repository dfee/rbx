import React from "react";
import renderer from "react-test-renderer";

import { Breadcrumb, BREADCRUMB_SEPARATORS } from "../breadcrumb";

describe("Breadcrumb component", () => {
  it("should be a Breadcrumb", () => {
    const component = renderer.create(
      <Breadcrumb>
        {[
          { href: "/", name: "Home" },
          { href: "/section", name: "Section" },
          { active: true, href: "/detail", name: "Details" },
        ].map(({ active, href, name }, i) => (
          <Breadcrumb.Item active={active} href={href} key={i}>
            {name}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  [undefined, ...BREADCRUMB_SEPARATORS].map(separator =>
    it(`should use separator ${separator}`, () => {
      const component = renderer.create(
        <Breadcrumb separator={separator}>
          {[
            { href: "#1", name: "Storybook" },
            { href: "#2", name: "Breadcrumb" },
            { active: true, href: "#3", name: "Breadcrumb Types" },
          ].map(({ active, href, name }, i) => (
            <Breadcrumb.Item active={active} href={href} key={i}>
              {name}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>,
      );
      expect(component.toJSON()).toMatchSnapshot();
    }),
  );

  it("should use inline style and custom size", () => {
    const component = renderer.create(
      <Breadcrumb style={{ marginTop: 10 }} size="large">
        {[
          { href: "/", name: "Home" },
          { href: "/section", name: "Section" },
          { active: true, href: "/detail", name: "Details" },
        ].map(({ active, href, name }, i) => (
          <Breadcrumb.Item active={active} href={href} key={i}>
            {name}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
