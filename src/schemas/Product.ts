import type { StructuredData } from "../DynamicHead.types";

export interface OfferProps {
  "@type": "Offer";
  price: number | string;
  priceCurrency: string;
  availability?: string;        // e.g. "https://schema.org/InStock"
  url?: string;                 // URL de la página de la oferta
  validFrom?: string;           // e.g. "2025-06-22T09:00:00+00:00"
  priceValidUntil?: string;     // e.g. "2025-07-01"
}

export interface ProductProps {
  /** Nombre del producto (requerido) */
  name: string;
  /** Descripción corta */
  description?: string;
  /** Una o más URLs de imagen */
  image: string | string[];
  /** URL canónica de la página del producto */
  url?: string;
  /** SKU, MPN u otro identificador */
  sku?: string;
  /** Marca como objeto o string */
  brand?: { "@type": "Brand"; name: string } | string;
  /** Oferta obligatoria para que aparezca en rich results */
  offers: OfferProps;
  /** Rating agregado o reseñas opcionales */
  aggregateRating?: {
    "@type": "AggregateRating";
    ratingValue: number;
    reviewCount?: number;
    bestRating?: number;
    worstRating?: number;
  };
  /** Opiniones individuales opcionales */
  review?: Array<{
    "@type": "Review";
    author: { "@type": "Person"; name: string };
    datePublished?: string;
    reviewBody: string;
    reviewRating: {
      "@type": "Rating";
      ratingValue: number;
      bestRating?: number;
      worstRating?: number;
    };
  }>;
}

export function product(opts: ProductProps): StructuredData {
  return {
    type: "Product",
    data: {
      "@context": "https://schema.org",
      "@type": "Product",
      ...opts,
    },
  };
}
