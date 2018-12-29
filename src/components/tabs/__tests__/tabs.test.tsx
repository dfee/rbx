import React from "react";

import { Tab } from "../tab";
import { Tabs, TABS_ALIGNMENTS, TABS_SIZES, TABS_TYPES } from "../tabs";

import {
  hasProperties,
  makeNodeFactory,
  makeShallowWrapper,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateOneOfPropType,
} from "../../../__tests__/testing";

const COMPONENT = Tabs;
const COMPONENT_NAME = "Tabs";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "tabs";

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Tab,
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(
    makeNode,
    makeShallowWrapper,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
  );

  testThemeIntegration(makeNode, makeShallowWrapper);

  describe("props", () => {
    const { propTypes } = COMPONENT;

    describe("align", () => {
      validateOneOfPropType(propTypes, "align", TABS_ALIGNMENTS);

      TABS_ALIGNMENTS.map(align =>
        it(`should be ${align}`, () => {
          const node = makeNode({ align });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass(`is-${align}`)).toBe(true);
        }),
      );
    });

    describe("children", () => {
      it("should wrap children in an ul element", () => {
        const node = makeNode({ children: <div className="foo" /> });
        const wrapper = makeShallowWrapper(node);
        const children = wrapper.children();
        expect(children.is("ul")).toBe(true);
        expect(children.children().is("div")).toBe(true);
        expect(children.children().hasClass("foo")).toBe(true);
      });
    });

    describe("fullwidth", () => {
      validateBoolPropType(propTypes, "fullwidth");

      [false, true].map(fullwidth =>
        it(`should ${fullwidth ? "" : "not "}be fullwidth`, () => {
          const node = makeNode({ fullwidth });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass("is-fullwidth")).toBe(fullwidth);
        }),
      );
    });

    describe("size", () => {
      validateOneOfPropType(propTypes, "size", TABS_SIZES);

      TABS_SIZES.map(size =>
        it(`should be ${size}`, () => {
          const node = makeNode({ size });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass(`is-${size}`)).toBe(true);
        }),
      );
    });

    describe("type", () => {
      validateOneOfPropType(propTypes, "type", TABS_TYPES);

      TABS_TYPES.map(type =>
        it(`should be ${type}`, () => {
          const node = makeNode({ type });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass(`is-${type}`)).toBe(true);
        }),
      );
    });
  });
});

// import Enzyme from "enzyme";
// import React from "react";

// import { Tab } from "../tab";
// import { Tabs, TABS_ALIGNMENTS, TABS_SIZES, TABS_TYPES } from "../tabs";

// import {
//   hasProperties,
//   testGenericPropTypes,
//   validateBoolPropType,
//   validateOneOfPropType,
// } from "../../../__tests__/testing";

// describe("Tabs component", () => {
//   hasProperties(Tabs, {
//     Tab,
//     defaultProps: { as: "div" },
//   });

//   it("should render as the default element", () => {
//     const wrapper = Enzyme.shallow(<Tabs />);
//     expect(wrapper.is("div")).toBe(true);
//   });

//   it("should render as a custom component", () => {
//     const as = "span";
//     const wrapper = Enzyme.shallow(<Tabs as={as} />);
//     expect(wrapper.is(as)).toBe(true);
//   });

//   it("should forward ref", () => {
//     const ref = React.createRef<HTMLDivElement>();
//     // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
//     const wrapper = Enzyme.mount(
//       <div>
//         <Tabs ref={ref} />
//       </div>,
//     );
//     try {
//       expect(ref.current).toBe(wrapper.find(".tabs").instance());
//     } finally {
//       wrapper.unmount();
//     }
//   });

//   it("should have bulma className", () => {
//     const wrapper = Enzyme.shallow(<Tabs />);
//     expect(wrapper.hasClass("tabs")).toBe(true);
//   });

//   it("should preserve custom className", () => {
//     const className = "foo";
//     const wrapper = Enzyme.shallow(<Tabs className={className} />);
//     expect(wrapper.hasClass(className)).toBe(true);
//   });

//   TABS_ALIGNMENTS.map(align =>
//     it(`should be aligned ${align}`, () => {
//       const wrapper = Enzyme.shallow(<Tabs align={align} />);
//       expect(wrapper.hasClass(`is-${align}`)).toBe(true);
//     }),
//   );

//   TABS_SIZES.map(size =>
//     it(`should be size ${size}`, () => {
//       const wrapper = Enzyme.shallow(<Tabs size={size} />);
//       expect(wrapper.hasClass(`is-${size}`)).toBe(true);
//     }),
//   );

//   TABS_TYPES.map(type =>
//     it(`should be type ${type}`, () => {
//       const wrapper = Enzyme.shallow(<Tabs type={type} />);
//       expect(wrapper.hasClass(`is-${type}`)).toBe(true);
//       expect(wrapper.hasClass("is-toggle-rounded")).toBe(
//         type === "toggle-rounded",
//       );
//     }),
//   );

//   [false, true].map(fullwidth =>
//     it(`should ${fullwidth ? "" : "not "}be fullwidth`, () => {
//       const wrapper = Enzyme.shallow(<Tabs fullwidth={fullwidth} />);
//       expect(wrapper.hasClass("is-fullwidth")).toBe(fullwidth);
//     }),
//   );

//   describe("propTypes", () => {
//     const { propTypes } = Tabs;
//     testGenericPropTypes(propTypes);
//     validateOneOfPropType(propTypes, "align", TABS_ALIGNMENTS);
//     validateBoolPropType(propTypes, "fullwidth");
//     validateOneOfPropType(propTypes, "size", TABS_SIZES);
//     validateOneOfPropType(propTypes, "type", TABS_TYPES);
//   });
// });
