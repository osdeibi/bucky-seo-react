import type { StructuredData } from "../DynamicHead.types";

export interface PostalAddressProps {
  "@type": "PostalAddress";
  streetAddress: string;
  addressLocality: string;
  addressCountry: string;
  addressRegion?: string;
  postalCode?: string;
}

export interface ContactPointProps {
  "@type": "ContactPoint";
  telephone?: string;
  email?: string;
  contactType?: string;
}

export interface OrganizationProps {
  /** URL de la organización */
  url?: string;
  /** URLs de perfiles sociales o equivalentes */
  sameAs?: string[];
  /** Logo de la organización */
  logo?: string;
  /** Nombre oficial */
  name?: string;
  /** Descripción breve */
  description?: string;
  /** Correo de contacto */
  email?: string;
  /** Teléfono de contacto */
  telephone?: string;
  /** Dirección postal */
  address?: PostalAddressProps;
  /** Identificador fiscal */
  vatID?: string;
  /** Código ISO6523 */
  iso6523Code?: string;
  /** Puntos de contacto adicionales */
  contactPoint?: ContactPointProps | ContactPointProps[];
  /** Cualquier otra propiedad extra permitida por schema.org */
  [key: string]: any;
}

/**
 * Generador de Organization basado en el ejemplo oficial :contentReference[oaicite:0]{index=0}
 */
export function organization(opts: OrganizationProps): StructuredData {
  return {
    type: "Organization",
    data: {
      "@context": "https://schema.org",
      "@type": "Organization",
      ...opts,
    },
  };
}
