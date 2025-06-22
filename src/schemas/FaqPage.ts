import type { StructuredData } from "../DynamicHead.types";

/** Un único FAQ: pregunta + respuesta */
export interface FaqQuestion {
  "@type": "Question";
  /** El texto de la pregunta */
  name: string;
  /** Respuesta asociada */
  acceptedAnswer: {
    "@type": "Answer";
    text: string;
  };
  /** (Opcional) Respuestas sugeridas */
  suggestedAnswer?: Array<{
    "@type": "Answer";
    text: string;
  }>;
}

/** Props para el FAQPage completo */
export interface FaqPageProps {
  mainEntity: FaqQuestion[];
}

/** Generador de JSON-LD para FAQPage según Google Search Central */
export function faqPage(opts: FaqPageProps): StructuredData {
  return {
    type: "FAQPage",
    data: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: opts.mainEntity,
    },
  };
}
