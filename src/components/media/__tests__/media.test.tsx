import { Media } from "src/components/media/media";
import { MediaItem } from "src/components/media/media-item";

import {
  hasProperties,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
} from "src/__tests__/testing";

const COMPONENT = Media;
const DISPLAY_NAME = "Media";
const DEFAULT_ELEMENT = "article";
const BULMA_CLASS_NAME = "media";

describe(`${DISPLAY_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Item: MediaItem,
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(COMPONENT, {
    displayName: DISPLAY_NAME,
    bulmaClassName: BULMA_CLASS_NAME,
    defaultElement: DEFAULT_ELEMENT,
  });

  testThemeIntegration(COMPONENT);
});
