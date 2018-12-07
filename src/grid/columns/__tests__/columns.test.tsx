import React from "react";
import renderer from "react-test-renderer";
import { Columns } from "../columns";

describe("Columns component", () => {
  it("should have columns classname", () => {
    const component = renderer.create(
      <Columns>
        <Columns.Column>1</Columns.Column>
        <Columns.Column>2</Columns.Column>
        <Columns.Column>3</Columns.Column>
      </Columns>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should have columns one column half width and 3 other as default", () => {
    const component = renderer.create(
      <Columns>
        <Columns.Column size="half">1</Columns.Column>
        <Columns.Column>2</Columns.Column>
        <Columns.Column>3</Columns.Column>
        <Columns.Column>4</Columns.Column>
      </Columns>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should render as paragraph", () => {
    const component = renderer.create(
      <Columns<"p"> as="p">
        <Columns.Column<"p"> as="p" size="half">
          1
        </Columns.Column>
        <Columns.Column<"p"> as="p">2</Columns.Column>
        <Columns.Column<"p"> as="p">3</Columns.Column>
        <Columns.Column<"p"> as="p">4</Columns.Column>
      </Columns>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should have columns one column half width, other narrow and 2 other as default", () => {
    const component = renderer.create(
      <Columns>
        <Columns.Column size="half">1</Columns.Column>
        <Columns.Column narrow>2</Columns.Column>
        <Columns.Column>3</Columns.Column>
        <Columns.Column>4</Columns.Column>
      </Columns>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
