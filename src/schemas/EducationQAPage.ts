import type { StructuredData } from "../DynamicHead.types";
import type { QuestionProps } from "./QAPage";  // reutilizamos los tipos de QAPage

export interface EducationQAPageProps {
  /** Único Question principal con acceptedAnswer/suggestedAnswer */
  mainEntity: QuestionProps;
}

/**
 * Education Q&A usa el mismo marcado que QAPage,
 * pero exportamos un helper con nombre más explícito.
 */
export function educationQAPage(
  opts: EducationQAPageProps
): StructuredData {
  return {
    type: "QAPage",
    data: {
      "@context": "https://schema.org",
      "@type": "QAPage",
      mainEntity: opts.mainEntity,
    },
  };
}
