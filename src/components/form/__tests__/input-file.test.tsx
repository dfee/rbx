import { shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";

import { setupWindow, teardownWindow } from "@/__tests__/helpers";
import { noop } from "@/utils";
import { InputFile } from "../input-file";

describe("Dropdown component", () => {
  beforeEach(() => {
    setupWindow();
  });

  afterEach(() => {
    teardownWindow();
  });

  it("should Exist", () => {
    expect(InputFile).toMatchSnapshot();
  });

  it("should render file input tree", () => {
    const component = renderer.create(<InputFile onChange={noop} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should call onChange with file data", () => {
    const onChange = jest.fn();
    const component = shallow(
      <InputFile
        className="input-file"
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
