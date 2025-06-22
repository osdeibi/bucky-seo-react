import type { StructuredData } from "../DynamicHead.types";

export interface ImageObjectProps {
  /** URL directo al recurso de la imagen */
  contentUrl: string;
  /** URL a la página de la licencia (required) */
  license: string;
  /** URL a la página donde adquirir la licencia (required) */
  acquireLicensePage: string;
  /** Texto de crédito, e.g. nombre del fotográfo */
  creditText?: string;
  /** Creadores (Person u Organization) */
  creator?: {
    "@type": "Person" | "Organization";
    name: string;
    url?: string;
  };
  /** Aviso de copyright */
  copyrightNotice?: string;
  /** Cualquier otra propiedad de ImageObject soportada */
  [key: string]: any;
}

/**
 * Genera un JSON-LD para ImageObject con licencias.
 * - `license` y `acquireLicensePage` son obligatorios :contentReference[oaicite:0]{index=0}.
 * - `creditText`, `creator` y `copyrightNotice` opcionales :contentReference[oaicite:1]{index=1}.
 */
export function imageObject(opts: ImageObjectProps): StructuredData {
  return {
    type: "ImageObject",
    data: {
      "@context": "https://schema.org",
      "@type": "ImageObject",
      ...opts,
    },
  };
}
