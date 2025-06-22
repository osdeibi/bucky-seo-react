import type { StructuredData } from "../DynamicHead.types";

/**
 * Props para Person dentro de ProfilePage.
 */
export interface PersonProps {
  "@type": "Person";
  name: string;
  url: string;
  image?: string | string[];
  jobTitle?: string;
  worksFor?: {
    "@type": "Organization";
    name: string;
  };
  sameAs?: string[];
  /** Cualquier otra propiedad registrada en schema.org/Person */
  [key: string]: any;
}

/**
 * Props para ProfilePage completo.
 */
export interface ProfilePageProps {
  mainEntity: PersonProps;
}

/**
 * Generador de ProfilePage:
 * Produce un JSON-LD como en el ejemplo de Google Search Central.
 */
export function profilePage(opts: ProfilePageProps): StructuredData {
  return {
    type: "ProfilePage",
    data: {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      mainEntity: opts.mainEntity,
    },
  };
}
