import type { StructuredData } from "../DynamicHead.types";

export interface DiscussionForumPostingProps {
  /** Título del hilo o tema */
  headline: string;
  /** Contenido principal del mensaje */
  articleBody: string;
  /** Autor del post */
  author: {
    "@type": "Person" | "Organization";
    name: string;
    url?: string;
  };
  /** Fecha de publicación ISO 8601 */
  datePublished: string;
  /** URL de la página del foro o hilo */
  forumUrl?: string;
  /** URL concreta de este mensaje (ancla) */
  discussionUrl?: string;
  /** Número de respuestas al hilo */
  replyCount?: number;
  /** Número total de comentarios */
  commentCount?: number;
  /** Palabras clave o etiquetas */
  keywords?: string | string[];
  /** Cualquier otro campo de schema.org/DiscussionForumPosting */
  [key: string]: any;
}

/**
 * Generador de JSON-LD para un post de foro (DiscussionForumPosting).
 */
export function discussionForumPosting(
  opts: DiscussionForumPostingProps
): StructuredData {
  return {
    type: "DiscussionForumPosting",
    data: {
      "@context": "https://schema.org",
      "@type": "DiscussionForumPosting",
      ...opts,
    },
  };
}
