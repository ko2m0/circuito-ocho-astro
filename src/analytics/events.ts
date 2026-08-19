export const EVENTS = {
  WHATSAPP_CLICK: "whatsapp_click",
  CTA_CLICK: "cta_click",
  FORM_START: "form_start",
  FORM_SUBMIT: "form_submit",
  FORM_SUCCESS: "form_success",
  SERVICE_VIEW: "service_view",
  LANGUAGE_SWITCH: "language_switch",
} as const;

export type AnalyticsEvent =
  (typeof EVENTS)[keyof typeof EVENTS];