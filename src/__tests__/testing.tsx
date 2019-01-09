import crypto from "crypto";

import classNames from "classnames";
import Enzyme from "enzyme";
import PropTypes from "prop-types";
import React from "react";

import { ForwardRefAsExoticComponent } from "src/base/exotic";
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
  exit: (
    {
      context,
      params,
      state,
    }: { context: TContext; params: TParams; state: TState },
  ) => void,
) => (
  params: TParams,
  inner: (
    {
      context,
      params,
      state,
    }: { context: TContext; params: TParams; state: TState },
  ) => void,
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
    delete (global as any).window;
    (global as any).window = value;

    return { context: {}, state: { window } };
  },
  ({ state: { window } }) => {
    (global as any).window = window;
  },
  // tslint:enable:no-any
);

export const withMockError = contextManager(
  () => {
    const context = { error: jest.fn() };
    const state = { error: global.console.error };
    global.console.error = context.error;

    return { context, state };
  },
  ({ state: { error } }) => {
    global.console.error = error;
  },
);

export const withEnzymeMount = contextManager(
  ({
    node,
    options,
  }: {
    node: JSX.Element;
    options?: Enzyme.MountRendererProps;
  }) => {
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    // So, mount in div
    const outer = Enzyme.mount(<div children={node} />, options);

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

export type MakeNodeFunction<
  TComponent extends ForwardRefAsExoticComponent<
    TComponentProps,
    TDefaultComponent
  >,
  TDefaultComponent extends React.ReactType = TComponent,
  TComponentProps extends { className?: string } = React.ComponentProps<
    TComponent
  >
> = (props?: TComponentProps) => JSX.Element;

export type MakeShallowWrapperFunction = (
  node: JSX.Element,
  contextValue?: ThemeContextValue,
) => Enzyme.ShallowWrapper<React.ReactType>;

export const makeNodeFactory = <
  // tslint:disable-next-line:no-any
  TComponent extends ForwardRefAsExoticComponent<any, any>,
  TComponentProps extends React.ComponentProps<TComponent> & {
    as?: React.ReactType; // tslint:disable-line:no-reserved-keywords
  } = React.ComponentProps<TComponent>
>(
  Component: TComponent,
) => (props: TComponentProps) => React.createElement(Component, props);

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

export const testForwardRefAsExoticComponentIntegration = (
  // tslint:disable-next-line:no-any
  makeNodeFunc: MakeNodeFunction<any>,
  makeShallowWrapperFunc: MakeShallowWrapperFunction,
  defaultElement: keyof React.ReactHTML,
  bulmaClassName: string | undefined,
  refPropName: string = "ref",
) => {
  describe("ForwardRefAsExoticComponent [integration]", () => {
    it("should render as the default element", () => {
      const node = makeNodeFunc({});
      const wrapper = makeShallowWrapperFunc(node);
      expect(wrapper.is(defaultElement)).toBe(true);
    });

    it("should render as a custom component", () => {
      const asType = "span" as React.ReactType;
      const node = makeNodeFunc({ as: asType });
      const wrapper = makeShallowWrapperFunc(node);
      expect(wrapper.is(asType)).toBe(true);
    });

    it("should forward ref", () => {
      const ref = React.createRef<HTMLElement>();
      const node = makeNodeFunc({ [refPropName]: ref });
      withEnzymeMount({ node }, ({ context: { wrapper } }) => {
        const selector =
          bulmaClassName !== undefined
            ? `${defaultElement}.${bulmaClassName}`
            : defaultElement;
        expect(ref.current).toBe(wrapper.find(selector).instance());
      });
    });

    if (bulmaClassName !== undefined) {
      it("should have bulma className", () => {
        const node = makeNodeFunc({});
        const wrapper = makeShallowWrapperFunc(node);
        expect(wrapper.hasClass(bulmaClassName)).toBe(true);
      });
    }

    it("should preserve custom className", () => {
      const className = "foo";
      const node = makeNodeFunc({ className });
      const wrapper = makeShallowWrapperFunc(node);
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
              const node = makeNodeFunc({ as });
              const wrapper = makeShallowWrapperFunc(node);
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
  makeNodeFunc: MakeNodeFunction<any>, // tslint:disable-line:no-any
  makeShallowWrapperFunc: MakeShallowWrapperFunction,
) => {
  describe("theme [integration]", () => {
    it("default transform", () => {
      withMockError({}, ({ context: { error } }) => {
        const node = makeNodeFunc({
          pull: "__UNKNOWN" as HelpersProps["pull"],
        });
        const wrapper = makeShallowWrapperFunc(node);
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
        const node = makeNodeFunc({ foo: "bar" });
        const wrapper = makeShallowWrapperFunc(node, { transform });
        expect(wrapper.hasClass("foo-bar")).toBe(true);
      });

      it("should warn on invalid prop transform", () => {
        withMockError({}, ({ context }) => {
          const node = makeNodeFunc({ foo: "qux" });
          const wrapper = makeShallowWrapperFunc(node, { transform });
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
  makeNodeFunc: MakeNodeFunction<any>, // tslint:disable-line:no-any
) => (
  propName: string,
  propValue: any, // tslint:disable-line:no-any
  mappedPropName?: string,
) => {
  it(`forwards ${propName}: ${propValue}`, () => {
    const node = makeNodeFunc({ [propName]: propValue });
    const wrapper = Enzyme.shallow(node);
    expect(
      wrapper.prop(mappedPropName !== undefined ? mappedPropName : propName),
    ).toBe(propValue);
  });
};
