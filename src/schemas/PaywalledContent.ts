import type { StructuredData } from "../DynamicHead.types";

export interface PaywalledContentProps {
  /** El tipo de CreativeWork: "NewsArticle", "Article", etc. */
  contentType: string;
  headline: string;
  image?: string | string[];
  datePublished?: string;
  dateModified?: string;
  author?: {
    "@type": string;
    name: string;
    url?: string;
  };
  description?: string;
  /** Debe ser false para indicar que NO es accesible sin pago/registro */
  isAccessibleForFree: boolean;
  /** Marca la sección paywalled con un selector CSS */
  hasPart: {
    "@type": "WebPageElement";
    isAccessibleForFree: boolean;
    cssSelector: string;
  };
}

export function paywalledContent(
  opts: PaywalledContentProps
): StructuredData {
  const {
    contentType,
    ...restProps
  } = opts;

  return {
    type: contentType,
    data: {
      "@context": "https://schema.org",
      "@type": contentType,
      ...restProps
    },
  };
}
