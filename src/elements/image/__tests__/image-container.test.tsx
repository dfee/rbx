import React from "react";

import { Image } from "src/elements/image/image";
import {
  IMAGE_CONTAINER_DEFAULTS,
  ImageContainer,
} from "src/elements/image/image-container";
import {
  hasProperties,
  makeShallowWrapperFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = ImageContainer;
const DISPLAY_NAME = "Image.Container";
const DEFAULT_ELEMENT = "figure";
const BULMA_CLASS_NAME = "image";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
    VARIABLE_DEFAULTS: IMAGE_CONTAINER_DEFAULTS,
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
    displayName: DISPLAY_NAME,
  });

  testThemeIntegration(COMPONENT);

  describe("props", () => {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    const { propTypes } = COMPONENT;

    const makeShallowWrapper = makeShallowWrapperFactory();

    describe("size", () => {
      validateStringOrNumberPropType(propTypes, "size");

      [
        ...IMAGE_CONTAINER_DEFAULTS.dimmensions,
        ...IMAGE_CONTAINER_DEFAULTS.ratios,
      ].forEach(size => {
        it(`should be ${size}`, () => {
          const node = <ImageContainer size={size} />;
          const wrapper = makeShallowWrapper({ node });
          if (typeof size === "number") {
            expect(wrapper.hasClass(`is-${size}x${size}`)).toBe(true);
          } else {
            expect(wrapper.hasClass(`is-${size}`)).toBe(true);
          }
        });
      });

      ["dimmension", "ratio"].forEach(sizeType => {
        const size = sizeType === "dimmension" ? 16 : "square";
        [undefined, null, "Image", "img", "div", "Fragment", "text"].forEach(
          childType => {
            const expectHasRatio =
              childType !== null &&
              childType !== undefined &&
              childType !== "text" &&
              sizeType === "ratio";

            let children: React.ReactNode | undefined;
            if (
              childType === null ||
              childType === undefined ||
              childType === "text"
            ) {
              children = childType;
            } else if (childType === "Image") {
              children = <Image />;
            } else if (childType === "img") {
              children = <img alt="" role="presentation" />;
            } else if (childType === "div") {
              children = <div />;
            } else if (childType === "Fragment") {
              children = (
                <>
                  <div />
                </>
              );
            }

            it(`should ${
              expectHasRatio ? "" : "not "
            }have class 'has-ratio' for ${JSON.stringify(childType)}`, () => {
              const node = (
                <ImageContainer size={size}>{children}</ImageContainer>
              );
              const wrapper = makeShallowWrapper({ node });
              const childWrapper = wrapper.children();
              if (childType === null || childType === undefined) {
                expect(childWrapper.length).toBe(0);
              } else if (childType === "text") {
                expect(wrapper.prop("children")).toEqual(
                  sizeType === "dimmension" ? childType : [childType],
                );
              } else {
                expect(childWrapper.hasClass("has-ratio")).toBe(expectHasRatio);
              }
            });
          },
        );
      });
    });
  });
});
