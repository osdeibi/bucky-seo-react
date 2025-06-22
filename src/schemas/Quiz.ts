import type { StructuredData } from "../DynamicHead.types";

export interface ThingProps {
  "@type": "Thing";
  name: string;
}

export interface CommentProps {
  "@type": "Comment";
  text: string;
}

export interface AnswerProps {
  "@type": "Answer";
  position: number;
  encodingFormat: string;
  text: string;
  comment?: CommentProps;
  answerExplanation?: CommentProps;
}

export interface QuestionProps {
  "@type": "Question";
  text: string;
  eduQuestionType: "Multiple choice" | "Checkbox";
  learningResourceType: "Practice problem";
  suggestedAnswer: AnswerProps[];
  acceptedAnswer: AnswerProps;
  comment?: CommentProps;
  about?: ThingProps;
  // opcional: puedes añadir educationalAlignment aquí
}

export interface QuizProps {
  /** Contexto del quiz (concepto general) */
  about?: ThingProps;
  /** Array de practice problems (mínimo 2 por tema) */
  hasPart: QuestionProps[];
  // opcional: educationalAlignment, etc.
}

/**
 * Generador de JSON-LD para Practice problems (Quiz) :contentReference[oaicite:0]{index=0}
 */
export function quiz(opts: QuizProps): StructuredData {
  return {
    type: "Quiz",
    data: {
      "@context": "https://schema.org",
      "@type": "Quiz",
      ...opts,
    },
  };
}
