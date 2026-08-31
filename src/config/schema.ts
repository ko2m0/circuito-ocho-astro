import { COMPANY, SITE } from "@/config";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.brandName,
    url: SITE.url,
    email: COMPANY.email,
    logo: `${SITE.url}${SITE.favicon}`,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    inLanguage: ["es-MX", "en-US"],
  };
}