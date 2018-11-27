import { shallow } from "enzyme";
import { JSDOM } from "jsdom";
import React from "react";
import renderer from "react-test-renderer";

import { noop } from "utils";
import { InputFile } from "../input-file";

interface GlobalWithWindow extends NodeJS.Global {
  window?: JSDOM["window"];
}

describe("Dropdown component", () => {
  beforeEach(() => {
    (global as GlobalWithWindow).window = new JSDOM(
      '<body><div id="app-root"></div></body>',
    ).window;
  });

  afterEach(() => {
    (global as GlobalWithWindow).window = undefined;
  });

  it("Should Exist", () => {
    expect(InputFile).toMatchSnapshot();
  });

  it("Should render file input tree", () => {
    const component = renderer.create(<InputFile onChange={noop} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should call onChange with file data", () => {
    const onChange = jest.fn();
    const component = shallow(
      <InputFile
        className="input-file"
        value=""
        style={{ width: 400 }}
        onChange={onChange}
      />,
    );
    component.find(".input-file .file-input").simulate("change", {
      target: {
        files: [
          {
            name: "dummyValue.something",
          },
        ],
      },
    });
    expect(component.state("filename")).toBe("dummyValue.something");
    expect(onChange).toBeCalled();
  });

  it("should call onChange without file data", () => {
    const onChange = jest.fn();
    const component = shallow(
      <InputFile
        className="input-file"
        value=""
        style={{ width: 400 }}
        onChange={onChange}
      />,
    );
    component.find(".input-file .file-input").simulate("change", {
      target: {
        files: [],
      },
    });
    expect(component.state("filename")).toBe(undefined);
    expect(onChange).toBeCalled();
  });
});
