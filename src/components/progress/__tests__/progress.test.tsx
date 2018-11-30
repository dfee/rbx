import React from "react";
import renderer from "react-test-renderer";

import { COLORS } from "@/modifiers/color";
import { Progress } from "../progress";

describe("Progress component", () => {
  it("should exist", () => {
    expect(Progress).toMatchSnapshot();
  });

  it("should have notification classname", () => {
    const component = renderer.create(<Progress value={30} max={100} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should concat classname in props with Bulma classname", () => {
    const component = renderer.create(
      <Progress value={30} max={100} className="other-class this-is-a-test" />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should use inline styles", () => {
    const component = renderer.create(
      <Progress value={30} max={100} style={{ width: 250 }} />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should be Large", () => {
    const component = renderer.create(
      <Progress value={30} max={100} size="large" />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  COLORS.map(color =>
    it(`should use use color ${color}`, () => {
      const component = renderer.create(
        <Progress value={30} max={100} color={color} />,
      );
      expect(component.toJSON()).toMatchSnapshot();
    }),
  );
});
