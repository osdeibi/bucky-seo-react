import type { StructuredData } from "../DynamicHead.types";

export interface JobPostingProps {
  title: string;                       // Título del puesto
  description: string;                 // Descripción HTML o texto
  datePosted: string;                  // Fecha ISO 8601
  validThrough?: string;               // Fecha límite ISO 8601
  employmentType?: string | string[];  // e.g. "FULL_TIME", ["PART_TIME","CONTRACTOR"]
  hiringOrganization: {
    "@type": "Organization";
    name: string;
    sameAs?: string;
    logo?: string;
  };
  jobLocation: {
    "@type": "Place";
    address: {
      "@type": "PostalAddress";
      streetAddress: string;
      addressLocality: string;
      addressRegion?: string;
      postalCode?: string;
      addressCountry: string;
    };
  } | Array<{
    "@type": "Place";
    address: {
      "@type": "PostalAddress";
      streetAddress: string;
      addressLocality: string;
      addressRegion?: string;
      postalCode?: string;
      addressCountry: string;
    };
  }>;
  baseSalary?: {
    "@type": "MonetaryAmount";
    currency: string;     // ISO 4217, e.g. "USD"
    value: {
      "@type": "QuantitativeValue";
      value: number;
      unitText: string;   // e.g. "HOUR", "YEAR"
    };
  };
  educationRequirements?: string;
  experienceRequirements?: string;
  qualifications?: string;
  responsibilities?: string;
  skills?: string;
  salaryCurrency?: string; // alias if prefieres
  // cualquier otro campo soportado por schema.org/JobPosting
  [key: string]: any;
}

/**
 * Generador de JobPosting según Google Search Central .
 */
export function jobPosting(opts: JobPostingProps): StructuredData {
  return {
    type: "JobPosting",
    data: {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      ...opts
    },
  };
}
