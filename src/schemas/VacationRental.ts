import type { StructuredData } from "../DynamicHead.types";

/**
 * Props para VacationRental, según el ejemplo de Google:
 * - Debes incluir al menos containsPlace (Accommodation) y otros required props.
 * - Puedes añadir las recommended properties opcionales.
 */
export interface VacationRentalProps {
  additionalType?: string;
  brand?: {
    "@type": "Brand";
    name: string;
  };
  containsPlace: {
    "@type": "Accommodation";
    additionalType?: string;
    bed?: {
      "@type": "BedDetails";
      numberOfBeds: number;
      typeOfBed: string;
    }[];
    occupancy: {
      "@type": "QuantitativeValue";
      value: number;
    };
    amenityFeature?: Array<{
      "@type": "LocationFeatureSpecification";
      name: string;
      value: boolean;
    }>;
    floorSize?: {
      "@type": "QuantitativeValue";
      value: number;
      unitCode: string;
    };
    numberOfBathroomsTotal?: number;
    numberOfBedrooms?: number;
    numberOfRooms?: number;
  };
  identifier: string;
  latitude: string | number;
  longitude: string | number;
  name: string;
  address: {
    "@type": "PostalAddress";
    addressCountry: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    streetAddress: string;
  };
  aggregateRating?: {
    "@type": "AggregateRating";
    ratingValue: number;
    ratingCount?: number;
    reviewCount?: number;
    bestRating?: number;
  };
  image: string[];
  checkinTime?: string;    // e.g. "18:00:00+08:00"
  checkoutTime?: string;   // e.g. "11:00:00+08:00"
  description?: string;
  knowsLanguage?: string[];
  review?: Array<{
    "@type": "Review";
    reviewRating: {
      "@type": "Rating";
      ratingValue: number;
      bestRating?: number;
    };
    author: {
      "@type": "Person";
      name: string;
    };
    datePublished?: string;
    contentReferenceTime?: string;
  }>;
}

/**
 * Generador de esquema VacationRental que inyecta el JSON-LD con @context y @type.
 * Basado en el ejemplo oficial de Google Search Central. :contentReference[oaicite:0]{index=0}
 */
export function vacationRental(opts: VacationRentalProps): StructuredData {
  return {
    type: "VacationRental",
    data: {
      "@context": "https://schema.org",
      "@type": "VacationRental",
      ...opts,
    },
  };
}
