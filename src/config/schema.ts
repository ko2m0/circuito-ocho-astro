import { COMPANY, SITE } from "@/config";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.brandName,
    url: SITE.url,
    email: COMPANY.email,
    logo: `${SITE.url}/img/C8_logo0626_F4.png`,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
  };
}