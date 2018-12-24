import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { Generic } from "../generic";
import { TransformFunc, transformHelpers } from "../helpers";

import {
  hasProperties,
  shallowInContext,
  validatePropType,
  withEnzymeMount,
  withMockError,
} from "../../__tests__/testing";
// import { testGenericPropTypes } from "../../__tests__/testing";
import { contextFactory } from "./context";

describe("Generic component", () => {
  hasProperties(Generic, {
    defaultProps: {
      as: "div",
      transform: transformHelpers,
    },
  });

  describe("forwardRefAs integration", () => {
    it("should render as the default element", () => {
      const wrapper = shallowInContext(Generic, contextFactory(), {});
      expect(wrapper.is("div")).toBe(true);
    });

    it("should render as a custom component", () => {
      const as = "span";
      const wrapper = shallowInContext(Generic, contextFactory(), { as });
      expect(wrapper.is(as)).toBe(true);
    });

    it("should forward ref", () => {
      const ref = React.createRef<HTMLDivElement>();
      withEnzymeMount({ node: <Generic ref={ref} /> }, ({ context }) => {
        expect(ref.current).toBe(
          context.wrapper
            .children() // forwardAs
            .instance(),
        );
      });
    });

    it("should preserve custom className", () => {
      const className = "foo";
      const wrapper = shallowInContext(Generic, contextFactory(), {
        className,
      });
      expect(wrapper.hasClass(className)).toBe(true);
    });

    describe("custom transform", () => {
      interface CustomHelpersProps {
        foo?: "bar" | "baz";
      }

      const customHelpersPropTypes = {
        foo: PropTypes.oneOf(["bar", "baz"]),
      };

      const transform: TransformFunc<CustomHelpersProps> = (
        props,
        componentName,
        location = "prop",
      ) => {
        PropTypes.checkPropTypes(
          customHelpersPropTypes,
          props,
          location,
          componentName,
        );
        const { foo, ...rest } = props;
        const className = classNames(props.className, { [`foo-${foo}`]: foo });
        return Object.assign(rest, className ? { className } : {});
      };

      it("should use custom transform", () => {
        const wrapper = shallowInContext(
          Generic,
          contextFactory({ transform }),
          { foo: "bar" },
        );
        expect(wrapper.props().className).toEqual("foo-bar");
      });

      it("should warn on invalid use of custom transform", () => {
        withMockError({}, ({ context }) => {
          const wrapper = shallowInContext(
            Generic,
            contextFactory({ transform }),
            { foo: "qux" },
          );
          expect(wrapper.props().className).toEqual("foo-qux");
          expect(context.error.mock.calls).toHaveLength(1);
          expect(context.error.mock.calls[0][0]).toMatch(
            new RegExp("Warning.+Invalid prop `foo`.+"),
          );
        });
      });
    });
  });

  describe("propTypes", () => {
    const { propTypes } = Generic;

    describe("exotic [integration]", () => {
      // tslint:disable-next-line:max-classes-per-file
      class ClassComponent extends React.Component {
        public render() {
          return React.createElement("div");
        }
      }

      const ForwardRefComponent = React.forwardRef((props, ref) =>
        React.createElement("div", { ref, ...props }),
      );

      const FunctionComponent = () => React.createElement("div");

      validatePropType(propTypes, "as", [
        { value: "div", valid: true },
        { value: ClassComponent, valid: true },
        { value: ForwardRefComponent, valid: true, descriptor: "ForwardRefAs" },
        { value: FunctionComponent, valid: true },
        { value: true, valid: false },
      ]);
    });

    describe("transformHelpers [integration]", () => {
      it("should warn on invalid propType", () => {
        withMockError({}, ({ context }) => {
          const wrapper = shallowInContext(Generic, contextFactory(), {
            pull: "__UNKNOWN",
          });
          expect(wrapper.props().className).toEqual("is-pulled-__UNKNOWN");
          expect(context.error.mock.calls).toHaveLength(1);
          expect(context.error.mock.calls[0][0]).toMatch(
            new RegExp("Warning.+Invalid prop `pull`.+"),
          );
        });
      });
    });
  });
});
