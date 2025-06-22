import type { StructuredData } from "../DynamicHead.types";

export interface MovieProps {
  /** Título de la película (required) */
  name: string;
  /** Descripción o sinopsis */
  description?: string;
  /** URL(s) de imagen o póster */
  image?: string | string[];
  /** URL canónica de la página de la película */
  url?: string;
  /** Director o lista de directores */
  director?: {
    "@type": "Person";
    name: string;
  } | Array<{
    "@type": "Person";
    name: string;
  }>;
  /** Escritor o lista de escritores */
  author?: {
    "@type": "Person";
    name: string;
  } | Array<{
    "@type": "Person";
    name: string;
  }>;
  /** Fecha de estreno ISO-8601 */
  datePublished?: string;
  /** Duración en formato ISO 8601, e.g. "PT1H30M" */
  duration?: string;
  /** Clasificación por edades, e.g. "PG-13" */
  contentRating?: string;
  /** Rating agregado */
  aggregateRating?: {
    "@type": "AggregateRating";
    ratingValue: number;
    ratingCount?: number;
    bestRating?: number;
    worstRating?: number;
  };
  /** Géneros, e.g. ["Action", "Comedy"] */
  genre?: string | string[];
  /** Cualquier otro campo soportado por schema.org/Movie */
  [key: string]: any;
}

/**
 * Generador de esquema Movie según Google Search Central.
 */
export function movie(opts: MovieProps): StructuredData {
  return {
    type: "Movie",
    data: {
      "@context": "https://schema.org",
      "@type": "Movie",
      ...opts,
    },
  };
}
