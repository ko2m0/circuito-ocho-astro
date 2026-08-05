import { es } from "./locales/es";
import { en } from "./locales/en";

export const translations = {
  es,
  en,
} as const;

export type Locale = keyof typeof translations;

export const defaultLocale: Locale = "es";