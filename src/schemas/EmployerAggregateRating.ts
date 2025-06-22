import type { StructuredData } from "../DynamicHead.types";

/**
 * Props para EmployerAggregateRating, según Google Search Central.
 * 
 */
export interface EmployerAggregateRatingProps {
  /** La organización que recibe la valoración */
  employer: {
    "@type": "Organization";
    name: string;
    url?: string;
    logo?: string;
  };
  /** Valor medio de las valoraciones (obligatorio) */
  ratingValue: number;
  /** Suma total de valoraciones */
  ratingCount?: number;
  /** Número de reseñas textuales */
  reviewCount?: number;
  /** Valor máximo posible (por defecto 5) */
  bestRating?: number;
  /** Valor mínimo posible (por defecto 1) */
  worstRating?: number;
}

/**
 * Genera un JSON-LD tipo EmployerAggregateRating:
 */
export function employerAggregateRating(
  opts: EmployerAggregateRatingProps
): StructuredData {
  return {
    type: "EmployeeRole",   // o puedes usar "Organization" según contexto
    data: {
      "@context": "https://schema.org",
      "@type": "EmployerAggregateRating",
      ...opts,
    },
  };
}
