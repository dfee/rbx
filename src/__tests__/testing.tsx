import crypto from "crypto";

import classNames from "classnames";
import Enzyme from "enzyme";
import PropTypes from "prop-types";
import React from "react";

import { HelpersProps } from "src/base/helpers";
import { ValidatingTransformFunction } from "src/base/helpers/factory";
import {
  initialValue as themeInitialValue,
  ThemeContextValue,
} from "src/base/theme";

export const contextManager = <
  TContext extends object,
  TParams extends object,
  TState extends object
>(
  enter: (params: TParams) => { context: TContext; state: TState },
  exit: ({
    context,
    params,
    state,
  }: {
    context: TContext;
    params: TParams;
    state: TState;
  }) => void,
) => (
  params: TParams,
  inner: ({
    context,
    params,
    state,
  }: {
    context: TContext;
    params: TParams;
    state: TState;
  }) => void,
) => {
  const { context, state } = enter(params);
  try {
    inner({ context, params, state });
  } finally {
    exit({ context, params, state });
  }
};

export const withWindow = contextManager(
  // tslint:disable:no-any
  ({ value }: { value?: undefined } = {}) => {
    const window = (global as any).window;
    // delete (global as any).window;

    if (value !== undefined) {
      (global as any).window = value;
    }

    return { context: {}, state: { window } };
  },
  ({ state: { window } }) => {
    (global as any).window = window;
  },
  // tslint:enable:no-any
);

export const withMockError = contextManager(
  () => ({
    context: {
      error: jest
        .spyOn(global.console, "error")
        .mockImplementation(() => undefined),
    },
    state: {},
  }),
  ({ context: { error } }) => {
    error.mockClear();
  },
);

export const withEnzymeMount = contextManager(
  ({
    node,
    options,
    makeWrappingNode,
  }: {
    node: JSX.Element;
    options?: Enzyme.MountRendererProps;
    makeWrappingNode?(node: JSX.Element): JSX.Element;
  }) => {
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    // So, mount in div
    const wrappingNode =
      makeWrappingNode !== undefined ? (
        makeWrappingNode(node)
      ) : (
        <div children={node} />
      );
    const outer = Enzyme.mount(wrappingNode, options);

    return { context: { wrapper: outer.children() }, state: { outer } };
  },
  ({ state: { outer } }) => outer.unmount(),
);

export const hasProperties = <T extends object>(
  component: T,
  obj: { [s: string]: any }, // tslint:disable-line:no-any
) => {
  describe("properties", () => {
    Object.keys(obj).map(key => {
      it(`should have property ${key}`, () => {
        expect(component[key]).toEqual(obj[key]);
      });
    });
  });
};

export const makeRandomString = (length: number = 8) =>
  crypto.randomBytes(length).toString("hex");

export const validatePropType = <T extends {}>(
  propTypes: React.WeakValidationMap<T>,
  propName: string,
  options: {
    descriptor?: string;
    error?: RegExp;
    extras?: Partial<T>;
    valid: boolean;
    value: any; // tslint:disable-line:no-any
  }[],
) =>
  options.map(({ value, valid, error, descriptor, extras }) => {
    const descriptorString: string =
      descriptor !== undefined
        ? descriptor
        : value === undefined
        ? "undefined"
        : String(value);
    it(`should ${
      valid ? "not warn on valid" : "warn on invalid"
    } ${propName} [${descriptorString}]`, () => {
      withMockError({}, ({ context }) => {
        // if the componentName or locaation isn't randomized, propTypes will
        // (for some reason) fail if the prop is checked (and fails) twice
        PropTypes.checkPropTypes(
          propTypes,
          { [propName]: value, ...extras },
          "prop", // location
          makeRandomString(), // componentName
        );
        if (valid) {
          expect(context.error.mock.calls).toHaveLength(0);
        } else {
          expect(context.error.mock.calls).toHaveLength(1);
          expect(context.error.mock.calls[0][0]).toMatch(
            error !== undefined
              ? error
              : new RegExp(`Warning.+Invalid prop.+\`${propName}\`.+`),
          );
        }
      });
    });
  });

export const validateBoolPropType = <T extends {}>(
  propTypes: React.WeakValidationMap<T>,
  propName: string,
  extras?: Partial<T>,
) =>
  validatePropType(propTypes, propName, [
    ...[false, true].map(value => ({ value, valid: true, extras })),
    { value: "string", valid: false, extras },
  ]);

export const validateNumberPropType = <T extends {}>(
  propTypes: React.WeakValidationMap<T>,
  propName: string,
  extras?: Partial<T>,
) =>
  validatePropType(propTypes, propName, [
    { value: 1, valid: true, extras },
    { value: "string", valid: false, extras },
  ]);

export const validateOneOfPropType = <T extends {}>(
  propTypes: React.WeakValidationMap<T>,
  propName: string,
  choices: (string | number)[],
  extras?: Partial<T>,
) =>
  validatePropType(propTypes, propName, [
    ...choices.map(value => ({ value, valid: true, extras })),
    { value: "__UNKNOWN", valid: false, extras },
  ]);

export const validateRefPropType = <T extends {}>(
  propTypes: React.WeakValidationMap<T>,
  propName: string,
  extras?: Partial<T>,
) =>
  validatePropType(propTypes, propName, [
    { value: () => undefined, valid: true, descriptor: "func", extras },
    { value: React.createRef(), valid: true, descriptor: "ref", extras },
    { value: "string", valid: false, extras }, // deprecated, won't support
  ]);

export const validateStringPropType = <T extends {}>(
  propTypes: React.WeakValidationMap<T>,
  propName: string,
  extras?: Partial<T>,
) =>
  validatePropType(propTypes, propName, [
    { value: "string", valid: true, extras },
    { value: 1, valid: false, extras },
  ]);

export const validateStringOrNumberPropType = <T extends {}>(
  propTypes: React.WeakValidationMap<T>,
  propName: string,
  extras?: Partial<T>,
) =>
  validatePropType(propTypes, propName, [
    { value: "string", valid: true, extras },
    { value: 1, valid: true, extras },
    { value: {}, valid: false, extras, descriptor: "obj" },
  ]);

export type MakeShallowWrapperFunction = (
  node: JSX.Element,
  contextValue?: ThemeContextValue,
) => Enzyme.ShallowWrapper<React.ReactType>;

// tslint:disable-next-line: no-any
export const makeNodeFactory = <T extends React.ComponentType<any>>(
  Component: T,
) => (props: React.ComponentProps<T>) => React.createElement(Component, props);

/**
 * This function makes a shallow wrapper of a "generic" component in the Theme
 * Context.Consumer.
 * A "generic" component is one that simply does a transform of its props and
 * returns a <Generic /> function.
 *
 * For example:
 *     const MyComponent = forwardRefAs<{}, 'div'>((props, ref) => (
 *         <Generic ref={ref} {...props} />
 *       ),
 *       { as: 'div' },
 *     );
 *
 * Because a Context.Consumer, as produced by Enzyme.shallow, produces a
 * wrapper that must be 'dive'd into to retrieve the Child, it accepts a
 * contextValue for the Theme Context.
 */
export const makeGenericHOCShallowWrapperInContextConsumer = (
  node: JSX.Element,
  themeContextValue: ThemeContextValue = themeInitialValue,
) => {
  const forwardRefWrapper = Enzyme.shallow(node);
  const themeContextConsumerWrapper = forwardRefWrapper.dive();
  const ThemeContextConsumerChildren = (themeContextConsumerWrapper.props() as {
    children: React.FC<ThemeContextValue>;
  }).children;

  return Enzyme.shallow(
    <ThemeContextConsumerChildren {...themeContextValue} />,
  );
};

// tslint:disable-next-line: max-func-body-length
export const testForwardRefAsExoticComponentIntegration = (
  //tslint:disable:no-any
  component: React.ComponentType<any>,
  options: {
    bulmaClassName?: string;
    defaultElement: keyof React.ReactHTML;
    displayName: string;
    makeShallowWrapper?: MakeShallowWrapperFunction;
    refProp?: string;
    makeNode?(props: any): JSX.Element;
    makeWrappingNode?(node: React.ReactNode): JSX.Element;
    //tslint:enable:no-any
  },
) => {
  const {
    bulmaClassName,
    defaultElement,
    displayName,
    makeNode,
    makeShallowWrapper,
    makeWrappingNode,
    refProp,
  } = {
    makeNode: makeNodeFactory(component),
    makeShallowWrapper: makeGenericHOCShallowWrapperInContextConsumer,
    refProp: "ref",
    ...options,
  };

  describe("ForwardRefAsExoticComponent [integration]", () => {
    it(`should have displayName: ${displayName}`, () => {
      expect(component.displayName).toEqual(displayName);
    });

    it("should render as the default element", () => {
      const node = makeNode({});
      const wrapper = makeShallowWrapper(node);
      expect(wrapper.is(defaultElement)).toBe(true);
    });

    it("should render as a custom component", () => {
      const asType = "span" as React.ReactType;
      const node = makeNode({ as: asType });
      const wrapper = makeShallowWrapper(node);
      expect(wrapper.is(asType)).toBe(true);
    });

    it("should forward ref", () => {
      const ref = React.createRef<HTMLElement>();
      const node = makeNode({ [refProp]: ref });
      withEnzymeMount(
        { node, makeWrappingNode },
        ({ context: { wrapper } }) => {
          const selector =
            bulmaClassName !== undefined
              ? `${defaultElement}.${bulmaClassName}`
              : defaultElement;
          expect(ref.current).toBe(wrapper.find(selector).instance());
        },
      );
    });

    if (bulmaClassName !== undefined) {
      it("should have bulma className", () => {
        const node = makeNode({});
        const wrapper = makeShallowWrapper(node);
        expect(wrapper.hasClass(bulmaClassName)).toBe(true);
      });
    }

    it("should preserve custom className", () => {
      const className = "foo";
      const node = makeNode({ className });
      const wrapper = makeShallowWrapper(node);
      expect(wrapper.hasClass(className)).toBe(true);
    });

    describe("props", () => {
      describe("as", () => {
        const FC: React.FC = () => React.createElement("div");

        /** test class */
        class CC extends React.Component {
          public render() {
            return React.createElement("div");
          }
        }

        const FRC = React.forwardRef((props, ref) =>
          React.createElement("div", { ref, ...props }),
        );

        [
          { as: "div", descriptor: "HTMLElement", valid: true },
          { as: FC, descriptor: "function component", valid: true },
          { as: CC, descriptor: "class component", valid: true },
          { as: FRC, descriptor: "forwardRef component", valid: true },
          { as: true, descriptor: "invalid type", valid: false },
        ].map(({ as, descriptor, valid }) => {
          it(`should ${valid ? "" : "not "}allow ${descriptor}`, () => {
            withMockError({}, ({ context: { error } }) => {
              const node = makeNode({ as });
              const wrapper = makeShallowWrapper(node);
              expect(wrapper.exists()).toBe(true);
              if (valid) {
                expect(error.mock.calls).toHaveLength(0);
              } else {
                expect(error.mock.calls).toHaveLength(2);
                expect(error.mock.calls[0][0]).toMatch(
                  new RegExp("Warning: Failed prop.+`as`.+"),
                );
                expect(error.mock.calls[1][0]).toMatch(
                  new RegExp("Warning: React.createElement: type is invalid"),
                );
              }
            });
          });
        });
      });
    });
  });
};

export const testThemeIntegration = (
  // tslint:disable:no-any
  component: React.ComponentType<any>,
  options?: {
    makeShallowWrapper?: MakeShallowWrapperFunction;
    makeNode?(props: any): JSX.Element;
  },
  // tslint:enable:no-any
) => {
  const { makeNode, makeShallowWrapper } = {
    makeNode: makeNodeFactory(component),
    makeShallowWrapper: makeGenericHOCShallowWrapperInContextConsumer,
    ...options,
  };

  describe("theme [integration]", () => {
    it("default transform", () => {
      withMockError({}, ({ context: { error } }) => {
        const node = makeNode({
          pull: "__UNKNOWN" as HelpersProps["pull"],
        });
        const wrapper = makeShallowWrapper(node);
        expect(wrapper.hasClass("is-pulled-__UNKNOWN")).toBe(true);
        expect(error.mock.calls).toHaveLength(1);
        expect(error.mock.calls[0][0]).toMatch(
          new RegExp("Warning.+Invalid prop `pull`.+"),
        );
      });
    });

    describe("custom transform", () => {
      interface CustomHelpersProps {
        foo?: "bar" | "baz";
      }

      const customHelpersPropTypes = {
        foo: PropTypes.oneOf(["bar", "baz"]),
      };

      const transform: ValidatingTransformFunction<CustomHelpersProps> = (
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
        const { className, foo, ...rest } = props;

        return {
          className: classNames({ [`foo-${foo}`]: foo }, className),
          ...rest,
        };
      };

      it("should transform prop", () => {
        const node = makeNode({ foo: "bar" });
        const wrapper = makeShallowWrapper(node, { transform });
        expect(wrapper.hasClass("foo-bar")).toBe(true);
      });

      it("should warn on invalid prop transform", () => {
        withMockError({}, ({ context }) => {
          const node = makeNode({ foo: "qux" });
          const wrapper = makeShallowWrapper(node, { transform });
          expect(wrapper.hasClass("foo-qux")).toBe(true);
          expect(context.error.mock.calls).toHaveLength(1);
          expect(context.error.mock.calls[0][0]).toMatch(
            new RegExp("Warning.+Invalid prop `foo`.+"),
          );
        });
      });
    });
  });
};

export const makeTestPropForwarding = (
  component: React.ComponentType<any>, // tslint:disable-line:no-any
) => {
  const makeNode = makeNodeFactory(component);

  return (
    propName: string,
    propValue: any, // tslint:disable-line:no-any
    mappedPropName?: string,
  ) => {
    it(`forwards ${propName}: ${propValue}`, () => {
      const node = makeNode({ [propName]: propValue });
      const wrapper = Enzyme.shallow(node);
      expect(
        wrapper.prop(mappedPropName !== undefined ? mappedPropName : propName),
      ).toBe(propValue);
    });
  };
};
