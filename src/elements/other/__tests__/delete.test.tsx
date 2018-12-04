import React from "react";
import renderer from "react-test-renderer";

import { Delete, DELETE_SIZES } from "../delete";

describe("Delete component", () => {
  it("should Exist", () => {
    expect(Delete).toMatchSnapshot();
  });

  it("should have delete classname", () => {
    const component = renderer.create(<Delete />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  DELETE_SIZES.map(size => {
    it(`should be size ${size}`, () => {
      const component = renderer.create(<Delete size={size} />);
      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});
