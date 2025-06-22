import type { StructuredData } from "../DynamicHead.types";

export interface PostalAddressProps {
  "@type": "PostalAddress";
  streetAddress: string;
  addressLocality: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry: string;
}

export interface PlaceProps {
  "@type": "Place" | "VirtualLocation";
  name?: string;
  address?: PostalAddressProps;
  url?: string;
}

export interface OfferProps {
  "@type": "Offer";
  url?: string;
  price?: number | string;
  priceCurrency?: string;
  availability?: string;
  validFrom?: string;
}

export interface OrgOrPersonProps {
  "@type": "Organization" | "Person";
  name: string;
  url?: string;
}

export interface EventProps {
  /** Título del evento (requerido) */
  name: string;
  /** Fecha y hora de inicio ISO-8601 (requerido) */
  startDate: string;
  /** Fecha y hora de fin ISO-8601 (opcional) */
  endDate?: string;
  /** Estado del evento: EventScheduled, EventCancelled, EventRescheduled… */
  eventStatus?: string;
  /** Para eventos reprogramados */
  previousStartDate?: string;
  /** Lugar físico o virtual del evento (requerido) */
  location: PlaceProps;
  /** Imágenes del evento */
  image?: string | string[];
  /** Descripción del evento */
  description?: string;
  /** URL canónica de la página del evento */
  url?: string;
  /** Información de venta de entradas */
  offers?: OfferProps | OfferProps[];
  /** Artistas o ponentes */
  performer?: OrgOrPersonProps | OrgOrPersonProps[];
  /** Organización o persona anfitriona */
  organizer?: OrgOrPersonProps;
  /** Cualquier otro campo soportado por schema.org/Event */
  [key: string]: any;
}

/**
 * Generador de JSON-LD para Event, basado en el ejemplo oficial :contentReference[oaicite:0]{index=0}.
 */
export function event(opts: EventProps): StructuredData {
  return {
    type: "Event",
    data: {
      "@context": "https://schema.org",
      "@type": "Event",
      ...opts,
    },
  };
}
