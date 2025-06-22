import type { StructuredData } from "../DynamicHead.types";

export interface PostalAddressProps {
  "@type": "PostalAddress";
  streetAddress: string;
  addressLocality: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry: string;
}

export interface GeoCoordinatesProps {
  "@type": "GeoCoordinates";
  latitude: number | string;
  longitude: number | string;
}

export interface OpeningHoursSpecification {
  "@type": "OpeningHoursSpecification";
  dayOfWeek: string | string[];
  opens: string;       // e.g. "09:00"
  closes: string;      // e.g. "21:00"
  validFrom?: string;  // e.g. "2025-01-01"
  validThrough?: string;
}

export interface ReviewProps {
  "@type": "Review";
  reviewRating: {
    "@type": "Rating";
    ratingValue: number;
    bestRating?: number;
    worstRating?: number;
  };
  author: {
    "@type": "Person";
    name: string;
  };
  datePublished?: string;
  reviewBody?: string;
}

export interface LocalBusinessProps {
  /** Nombre del negocio (requerido) */
  name: string;
  /** URL(s) de imagen del negocio */
  image?: string | string[];
  /** Descripción breve */
  description?: string;
  /** URL de la página del negocio */
  url?: string;
  /** Teléfono de contacto */
  telephone?: string;
  /** Rango de precios, e.g. "$$$" */
  priceRange?: string;
  /** Tipo(s) de comida o servicio, e.g. "American" */
  servesCuisine?: string | string[];
  /** Dirección postal */
  address: PostalAddressProps;
  /** Coordenadas geográficas */
  geo?: GeoCoordinatesProps;
  /** Horarios de apertura */
  openingHoursSpecification?: 
    | OpeningHoursSpecification
    | OpeningHoursSpecification[];
  /** Reseña única o lista de reseñas */
  review?: ReviewProps | ReviewProps[];
  /** Sub-departamentos (cada uno puede tener sus propias props) */
  department?: LocalBusinessProps[];
  /** Lista de URLs de perfiles sociales u otros */
  sameAs?: string[];
  /** URL de menú online */
  menu?: string;
  /** Cualquier otro campo opcional soportado por schema.org */
  [key: string]: any;
}

/**
 * Generador de LocalBusiness según Google Search Central.
 * Ejemplo de Restaurant con LocalBusiness:  
 * :contentReference[oaicite:0]{index=0}
 */
export function localBusiness(opts: LocalBusinessProps): StructuredData {
  return {
    type: "LocalBusiness",
    data: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      ...opts,
    },
  };
}
