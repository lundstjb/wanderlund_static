import type { Property } from "../data/properties";

export const GA_MEASUREMENT_ID = "G-J77XFGQ9ZC";
/** GA only loads here, so dev, local previews, and Firebase preview channels stay out of the data. */
export const PRODUCTION_HOST = "www.wanderlund.com";

/** GA4 limits parameter values to 100 characters. */
const MAX_PARAM_LENGTH = 100;

export interface AnalyticsItem {
  item_id: string;
  item_name: string;
  price: number;
}

/** True when GA should load for this hostname. */
export function isProductionHost(hostname: string): boolean {
  return hostname === PRODUCTION_HOST;
}

/** GA4 ecommerce item for a property. */
export function analyticsItem(property: Property): AnalyticsItem {
  return {
    item_id: property.slug,
    item_name: property.title,
    price: property.nightlyFrom,
  };
}

/** Params for view_item and begin_checkout events. */
export function itemEventParams(item: AnalyticsItem): Record<string, unknown> {
  return { currency: "USD", value: item.price, items: [item] };
}

/** Lead method for a contact link, or null when the link is not one. */
export function leadMethod(href: string): "phone" | "email" | null {
  if (href.startsWith("tel:")) return "phone";
  if (href.startsWith("mailto:")) return "email";
  return null;
}

/** True for links that send guests to Airbnb. */
export function isAirbnbUrl(href: string): boolean {
  try {
    const host = new URL(href).hostname;
    return host === "airbnb.com" || host.endsWith(".airbnb.com");
  } catch {
    return false;
  }
}

/**
 * Search term from the search page query string (dates and guests set by the
 * Hospitable search bar), or null when there is no search.
 */
export function searchTerm(search: string): string | null {
  const term = search.replace(/^\?/, "");
  return term ? term.slice(0, MAX_PARAM_LENGTH) : null;
}
