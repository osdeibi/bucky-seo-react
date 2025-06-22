import type { StructuredData } from "../DynamicHead.types";

export interface ReviewSnippetProps {
  /**
   * El tipo de CreativeWork que reseñas:
   * “Product”, “Recipe”, “SoftwareApplication”, etc.
   */
  contentType: string;
  /** Título o nombre del ítem reseñado */
  name: string;
  /** Reseña textual */
  reviewBody: string;
  /** Autor de la reseña */
  author: {
    "@type": "Person" | "Organization";
    name: string;
  };
  /** Rating numérico (requerido) */
  reviewRating: {
    "@type": "Rating";
    /** Valor de la calificación */
    ratingValue: number;
    /** (Opcional) Máximo valor posible */
    bestRating?: number;
    /** (Opcional) Mínimo valor posible */
    worstRating?: number;
  };
  /** Fecha de publicación de la reseña */
  datePublished?: string;
  /** (Opcional) URL de la imagen asociada al item */
  image?: string | string[];
}

export function reviewSnippet(opts: ReviewSnippetProps): StructuredData {
  const { contentType, ...rest } = opts;
  return {
    type: contentType,
    data: {
      "@context": "https://schema.org",
      "@type": contentType,
      ...rest,
    },
  };
}
