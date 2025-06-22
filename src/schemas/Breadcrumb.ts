import type { StructuredData } from "../DynamicHead.types";

export interface BreadcrumbItem {
  /** Posición en la lista (1-based) */
  position: number;
  /** Texto de la miga de pan */
  name: string;
  /** URL de la página correspondiente */
  item: string;
}

/** Props para todo el BreadcrumbList */
export interface BreadcrumbListProps {
  itemListElement: BreadcrumbItem[];
}

/**
 * Generador de JSON-LD para BreadcrumbList.
 *
 * Google espera un objeto @type=BreadcrumbList con un array
 * itemListElement de ListItem :contentReference[oaicite:0]{index=0}.
 */
export function breadcrumbList(
  opts: BreadcrumbListProps
): StructuredData {
  return {
    type: "BreadcrumbList",
    data: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: opts.itemListElement.map(({ position, name, item }) => ({
        "@type": "ListItem",
        position,
        name,
        item
      }))
    }
  };
}
