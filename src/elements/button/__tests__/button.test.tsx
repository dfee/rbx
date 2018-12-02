import { mount, shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";

import { Button } from "../button";

const Link: React.SFC<{ to: string; children: React.ReactNode }> = ({
  to,
  children,
}) => <a href={to}>{children}</a>;

describe("Button component", () => {
  it("should exist", () => {
    expect(Button).toMatchSnapshot();
  });

  it("should expose Button Group", () => {
    expect(Button.Group).toMatchSnapshot();
  });

  it("should be a default Button", () => {
    const component = renderer.create(<Button />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should be an anchor button", () => {
    const component = renderer.create(
      <Button<"a"> as="a" href="https://github.com/dfee/rbx" />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should be a Primary Button", () => {
    const component = renderer.create(<Button color="primary" />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should be a Large Primary Button", () => {
    const component = renderer.create(<Button color="primary" size="large" />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should render as a static Button", () => {
    const component = renderer.create(<Button isStatic color="primary" />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should render as a html button", () => {
    const component = renderer.create(
      <Button<"button"> as="button" color="danger" />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should render as a React element link with to prop", () => {
    const component = renderer.create(
      <Button<typeof Link> as={Link} to="http://google.com" color="danger">
        TEST
      </Button>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should render be disabled", () => {
    const component = renderer.create(<Button disabled />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should be a submit form button", () => {
    const component = renderer.create(<Button submit />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should be a reset form button", () => {
    const component = renderer.create(<Button reset />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should have a Click listener", () => {
    const onClick = jest.fn();
    const component = shallow(<Button onClick={onClick} />);
    component.simulate("click");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("should have no dispatch click handler if disabled", () => {
    const onClick = jest.fn();
    const component = shallow(<Button disabled onClick={onClick} />);
    component.simulate("click");
    expect(onClick).toHaveBeenCalledTimes(0);
  });

  it("should have a call default onClick is no listener is set", () => {
    const spy = jest.spyOn(Button.defaultProps!, "onClick");
    const component = shallow(<Button />);
    component.simulate("click");
    component.simulate("click");
    expect(spy).toHaveBeenCalledTimes(2);
    spy.mockRestore();
  });

  it("should forward ref", () => {
    const testRef = React.createRef<HTMLButtonElement>();
    mount(<Button ref={testRef} />);
    expect(testRef.current).not.toBeNull();
  });

  describe("Button Group component", () => {
    it("should be a default list of buttons", () => {
      const component = renderer.create(
        <Button.Group>
          <Button>test 0</Button>
          <Button>test 1</Button>
        </Button.Group>,
      );
      expect(component).toMatchSnapshot();
    });

    it("should concat class names in props with Bulma class name", () => {
      const component = renderer.create(
        <Button.Group className="super-class-1 dope-class-2">
          <Button>test 0</Button>
          <Button>test 1</Button>
        </Button.Group>,
      );
      expect(component.toJSON()).toMatchSnapshot();
    });

    it("should group buttons together", () => {
      const component = renderer.create(
        <Button.Group hasAddons>
          <Button>test 1</Button>
          <Button>test 2</Button>
        </Button.Group>,
      );
      expect(component.toJSON()).toMatchSnapshot();
    });

    it("should be centered", () => {
      const component = renderer.create(
        <Button.Group position="centered">
          <Button>test 0</Button>
          <Button>test 1</Button>
        </Button.Group>,
      );
      expect(component.toJSON()).toMatchSnapshot();
    });

    it("should align to the right", () => {
      const component = renderer.create(
        <Button.Group position="right">
          <Button>test 0</Button>
          <Button>test 1</Button>
        </Button.Group>,
      );
      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});
