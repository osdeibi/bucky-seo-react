import type { StructuredData } from "../DynamicHead.types";

export interface PersonOrOrg {
  "@type": "Person" | "Organization";
  name: string;
  url?: string;
}

export interface CommentProps {
  "@type": "Comment";
  text: string;
  datePublished?: string;
  author: PersonOrOrg;
}

export interface AnswerProps {
  "@type": "Answer";
  text: string;
  url?: string;
  datePublished?: string;
  author: PersonOrOrg;
  image?: string;
  upvoteCount?: number;
  comment?: CommentProps;
}

export interface QuestionProps {
  "@type": "Question";
  name: string;
  text: string;
  answerCount?: number;
  upvoteCount?: number;
  datePublished?: string;
  author?: PersonOrOrg;
  acceptedAnswer?: AnswerProps;
  suggestedAnswer?: AnswerProps[];
}

export interface QAPageProps {
  mainEntity: QuestionProps;
}

/**
 * Generador de QAPage según Google Search Central :contentReference[oaicite:0]{index=0}.
 */
export function qaPage(opts: QAPageProps): StructuredData {
  return {
    type: "QAPage",
    data: {
      "@context": "https://schema.org",
      "@type": "QAPage",
      mainEntity: opts.mainEntity,
    },
  };
}
