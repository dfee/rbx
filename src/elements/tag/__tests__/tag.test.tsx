import React from "react";
import renderer from "react-test-renderer";

import { COLORS } from "@/modifiers/color";
import { Tag } from "../tag";

describe("Tag component", () => {
  it("should exist", () => {
    expect(Tag).toMatchSnapshot();
  });

  it("should expose Tag Group", () => {
    expect(Tag.Group).toMatchSnapshot();
  });

  it("should have tag classname", () => {
    const component = renderer.create(<Tag>Tag name</Tag>);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should concat classname in props with Bulma classname", () => {
    const component = renderer.create(
      <Tag className="other-class this-is-a-test">Tag name</Tag>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should use inline styles", () => {
    const component = renderer.create(
      <Tag style={{ width: 250 }}>Tag name</Tag>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should be Large", () => {
    const component = renderer.create(<Tag size="large">Tag Large</Tag>);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should be group tags", () => {
    const component = renderer.create(
      <Tag.Group gapless>
        <Tag>Tag 1</Tag>
        <Tag>Tag 2</Tag>
      </Tag.Group>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  COLORS.map(color =>
    it(`should use use color ${color}`, () => {
      const component = renderer.create(<Tag color={color}>tag {color}</Tag>);
      expect(component.toJSON()).toMatchSnapshot();
    }),
  );
});
