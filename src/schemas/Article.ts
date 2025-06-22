import type { StructuredData } from "../DynamicHead.types";

/**
 * Props para Article (NewsArticle, BlogPosting o Article genérico).
 * Basado en los ejemplos de Search Gallery .
 */
export interface ArticleProps {
  /** Tipo concreto: "Article" | "NewsArticle" | "BlogPosting" */
  articleType?: "Article" | "NewsArticle" | "BlogPosting";
  /** Título del artículo (required) */
  headline: string;
  /** Descripción breve o extracto */
  description?: string;
  /** URL canónica de la página */
  url?: string;
  /** Fecha de publicación ISO 8601 */
  datePublished?: string;
  /** Fecha de modificación ISO 8601 */
  dateModified?: string;
  /** Autor(es) */
  author?: {
    "@type": "Person" | "Organization";
    name: string;
    url?: string;
  } | Array<{
    "@type": "Person" | "Organization";
    name: string;
    url?: string;
  }>;
  /** Editor */
  publisher?: {
    "@type": "Organization";
    name: string;
    logo?: string;
    url?: string;
  };
  /** Imagen principal o galería */
  image?: string | string[];
  /** Contenido HTML o texto */
  articleBody?: string;
  /** Secciones del artículo */
  articleSection?: string | string[];
  /** Palabras clave */
  keywords?: string | string[];
  /** Cualquier otro campo soportado por schema.org/Article */
  [key: string]: any;
}

/**
 * Generador de JSON-LD para Article.
 */
export function article(opts: ArticleProps): StructuredData {
  const type = opts.articleType ?? "Article";
  const {
    articleType,
    ...rest
  } = opts;

  return {
    type,
    data: {
      "@context": "https://schema.org",
      "@type": type,
      ...rest,
    },
  };
}
