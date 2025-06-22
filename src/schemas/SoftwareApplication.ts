import type { StructuredData } from "../DynamicHead.types";

/**
 * Props para SoftwareApplication.
 * Basado en el ejemplo oficial de Google :contentReference[oaicite:0]{index=0}.
 */
export interface SoftwareApplicationProps {
  /** Nombre de la app (required) */
  name: string;
  /** Oferta; precio obligatorio, currency recomendado */
  offers: {
    "@type": "Offer";
    price: number;
    priceCurrency?: string;
  };
  /** Rating agregado o reseñas (uno de los dos) */
  aggregateRating?: {
    "@type": "AggregateRating";
    ratingValue: number;
    ratingCount?: number;
    reviewCount?: number;
    bestRating?: number;
  };
  review?: {
    "@type": "Review";
    reviewRating: {
      "@type": "Rating";
      ratingValue: number;
      bestRating?: number;
    };
    author: {
      "@type": string;
      name: string;
    };
    datePublished?: string;
    contentReferenceTime?: string;
  };
  /** Categoría de aplicación recomendada */
  applicationCategory?: string;
  /** Sistema operativo requerido */
  operatingSystem?: string;
  /** URL canónica de la aplicación */
  url?: string;
  /** Descripción opcional */
  description?: string;
}

export function softwareApplication(
  opts: SoftwareApplicationProps
): StructuredData {
  return {
    type: "SoftwareApplication",
    data: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      ...opts,
    },
  };
}
