import { Media } from "../media";
import { MediaItem } from "../media-item";

import {
  hasProperties,
  makeNodeFactory,
  makeShallowWrapper,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "../../../__tests__/testing";

const COMPONENT = Media;
const COMPONENT_NAME = "Media";
const DEFAULT_ELEMENT = "article";
const BULMA_CLASS_NAME = "media";

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Item: MediaItem,
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(
    makeNode,
    makeShallowWrapper,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
  );

  testThemeIntegration(makeNode, makeShallowWrapper);
});
