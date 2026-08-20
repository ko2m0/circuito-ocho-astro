import { SITE } from "./site";
import { COMPANY } from "./company";
import { DEFAULT_SEO } from "./seo";
import { NAVIGATION } from "./navigation";
import { SERVICES } from "./services";
import { SOCIAL } from "./social";
import { ANALYTICS } from "./analytics";

export const C8 = {
  site: SITE,
  company: COMPANY,
  seo: DEFAULT_SEO,
  navigation: NAVIGATION,
  services: SERVICES,
  social: SOCIAL,
  analytics: ANALYTICS,
} as const;

export { SITE, COMPANY };